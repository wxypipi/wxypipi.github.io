$(document).ready(function(){

document.documentElement.style.webkitTouchCallout = "none";
//uses document because document will be topmost level in bubbling
$(document).on('touchmove',function(e){
  e.preventDefault();
});
//uses body because jquery on events are called off of the element they are
//added to, so bubbling would not work if we used document instead.
$('body').on('touchstart','.scrollable',function(e) {
  if (e.currentTarget.scrollTop === 0) {
    e.currentTarget.scrollTop = 1;
  } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
    e.currentTarget.scrollTop -= 1;
  }
});
//prevents preventDefault from being called on document if it sees a scrollable div
$('body').on('touchmove','.scrollable',function(e) {
  e.stopPropagation();
});

// alert("33");

var mask = document.getElementById("mask"),
    mainBox = document.getElementById("mainBox"),
    menuBox = document.getElementById("menuBox"),
    mainMask = document.getElementById("mainMask"),
    $contentsTab = $("#contentsTab"),
    $searchTab = $("#searchTab"),
    $settingTab = $("#settingTab"),
    $menu = $("#menu"),
    menuFooterLine = document.getElementById("menuFooterLine"),
    menuBtn = document.getElementById("menuBtn"),
    $mainMask = $("#mainMask"),
    $contentsItem = $("#contentsPage li li"),
    $colorItem = $("#panelColor li"),
    previousBtn = document.getElementById("previousBtn"),
    nextBtn = document.getElementById("nextBtn"),
    previousGlow = document.getElementById("previousGlow"),
    nextGlow = document.getElementById("nextGlow"),
    imgL = document.getElementById("imgL"),
    imgR = document.getElementById("imgR"),
    imgM = document.getElementById("imgM"),
    imgBoxL = document.getElementById("imgBox1"),
    imgBoxM = document.getElementById("imgBox2"),
    imgBoxR = document.getElementById("imgBox3"),
    imgBox = [imgBoxL,imgBoxM,imgBoxR],
    aniBox1 = document.getElementById("aniBox1"),
    aniBox2 = document.getElementById("aniBox2"),
    openMenuTouchArea = document.getElementById("openMenuTouchArea"),
    stepText = document.getElementById("stepText"),
    // gradient = document.getElementById("menuFooterGradient"),
    mainAnimation = document.getElementById("mainAnimation"),
    btnAnimation = document.getElementById("btnAnimation"),
    lastContentsItem = false,
    lastColorItem = $colorItem[0],
    zh = document.getElementById("zh"),
    en = document.getElementById("en"),
    separate = true,
    // isChangeStep = true,
    currentStep = 1,
    maxStep = 4,
    dragging = false,
    moveDis = 0,
    changeStepThreshold = 0
    ;

function resize() {
    var style = document.getElementsByTagName("style")[0];
    if (style) {
        // 删掉上次执行resize()后产生的<style>
        style.parentNode.removeChild(style);
    };

    var height = Number((window.getComputedStyle(aniBox1).getPropertyValue('height')).slice(0,-2));
    var width = Number((window.getComputedStyle(aniBox1).getPropertyValue('width')).slice(0,-2));
    
    if (height > width) {
        var newWidth = width,
            newBoxwidth = width*3,
            marginTop = (height - width) / 2;
            moveDis = width;
    }else{
        var newWidth = height,
            newBoxwidth = width+height*2,
            marginTop = 0;
            moveDis = (width+height)/2;
    };

    imgBoxL.style.webkitTransform = "translate3d(-" + moveDis + "px,0,0)";
    imgBoxM.style.webkitTransform = "translate3d(0,0,0)";
    imgBoxR.style.webkitTransform = "translate3d(" + moveDis + "px,0,0)";
    
    changeStepThreshold = Math.round(newWidth/10);

    var cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    var rules = document.createTextNode(
    "#aniBox2 li{"+
        "position: absolute;"+
        "display: block;"+
        "background-size: " + newWidth + "px " + newWidth + "px;"+
        "height: " + newWidth + "px;"+
        "width: " + newWidth + "px;}"+

    "#aniBox2 li img{"+
        "height: " + newWidth + "px;"+
        "width: " + newWidth + "px;}"+

    "#mainAnimation{"+
        "margin-top: " + marginTop + "px;"+
        "height: " + newWidth + "px;"+
        "width: " + newWidth + "px;"+
        "margin-left: " + ((width - newWidth) / 2) + "px}"+

    "#aniBox2{"+
        "height: " + newWidth + "px;"+
        "width: " + newWidth + "px;"+
        "top: " + marginTop + "px;"+
        "left: " + ((width - newWidth) / 2) + "px}"
    );

    cssAnimation.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(cssAnimation);
};

function menuTagTo(tag,lineTranslate,pageTranslate) {
    var $tag = $(tag);
    $contentsTab.css("opacity","0.6");
    $searchTab.css("opacity","0.6");
    $settingTab.css("opacity","0.6");
    $tag.css("opacity","1");
    menuFooterLine.style.webkitTransform = "translate3d(" + lineTranslate + ", 0, 0)"
    $menu.css("-webkit-transform","translate3d(" + pageTranslate + ", 0, 0)");
};

function selectStep(item) {
    if (item == lastContentsItem) {
        return;
    };
    if(lastContentsItem){
        lastContentsItem.style.backgroundPosition = "0 -40px";
        // lastContentsItem.style.color = "#B0B9C6";
    };
    item.style.backgroundPosition = "0 0";
    // item.style.color = "#EAEAEA";
    lastContentsItem = item;
};

function changeStepJ(target) {
    if (currentStep == target) {
        return
    }else if (target == 1) {
        imgM.src = "images/001_S.png";
        imgR.src = "images/002_S.png";
    }else if (target == maxStep) {
        imgM.src = "images/" + padding(target) + "_S.png";
        imgL.src = "images/" + padding(target-1) + "_S.png";
    }else {
        imgM.src = "images/" + padding(target) + "_S.png";
        imgL.src = "images/" + padding(target-1) + "_S.png";
        imgR.src = "images/" + padding(target+1) + "_S.png";
    };
    // imgAnimation.src = "images/" + padding(target) + "_Animation.png";

    if (!separate) {
        btnAnimationS();
    };
    currentStep = target;
    stepText.innerHTML = padding(currentStep);
    frameIndex = 0;//切换步骤时让动画回到第一帧，否则无法再次触发动画。
};

function padding(n) {
    return(("00" + n).slice(-3));
};


//=========================================JS Animation Timing Function===========================

//factor为0到1之间的数值。
//intensity为迭代次数，控制缓动效果的强弱。
//输出值为0到1之间的数值。

function simpleEaseOut(factor,intensity) {
    return 1 - Math.pow(1 - factor, intensity);
};

function simpleEaseIn(factor,intensity) {
    return Math.pow(factor, intensity);
};

function simpleEaseInOut(factor,intensity) {
    if (factor < 0.5) {
        return Math.pow(factor * 2, intensity) / 2;
    } else {
        return (1 - Math.pow((1 - factor) * 2, intensity)) / 2 + 0.5;
    };
};

function simpleEaseInOutBack(factor,intensity) {
    if (factor < 0.25) {
        return Math.pow(factor * 4, intensity) / 2;
    } else if (factor < 0.5){
        return (1 - Math.pow((0.5 - factor) * 4, intensity)) / 2 + 0.5;
    } else if (factor < 0.75) {
        return (1 - Math.pow((factor - 0.5) * 4, intensity)) / 2 + 0.5;
    } else {
        return Math.pow((1 - factor) * 4, intensity) / 2;
    };
};

//==========================================滑动翻页===============================================

var touchStartPos = false,
    touchMovePos = false,
    touchEnd = false,
    touchMoveDis = 0,
    touchEndMoveDis = 0,
    frameIndex = 10,
    animationing = false,
    slideChangeStep2 = false,
    factor = 0;

function slideChangeStep() {
    if (!touchEnd) {
        touchMoveDis = touchMovePos - touchStartPos;
        if (touchMoveDis > 0) {
            imgBoxM.style.webkitTransform = "translate3d("+touchMoveDis+"px,0,0)";
            imgBoxL.style.webkitTransform = "translate3d("+(touchMoveDis-moveDis)+"px,0,0)";
        } else {
            imgBoxM.style.webkitTransform = "translate3d("+touchMoveDis+"px,0,0)";
            imgBoxR.style.webkitTransform = "translate3d("+(touchMoveDis+moveDis)+"px,0,0)";
        };
        window.requestAnimationFrame(slideChangeStep);
    } else {
        frameIndex = 20;
        factor = moveDis/Math.abs(touchMoveDis)-1;
        if (touchMoveDis == 0) {
            return;
        } else if (touchMoveDis > changeStepThreshold && currentStep != 1) {
            changeStepP();
        } else if (touchMoveDis < -changeStepThreshold && currentStep != maxStep) {
            changeStepN();
        } else if (touchMoveDis > 0) {
            notChangeStepP();
        } else {
            notChangeStepN();
        };
        animationing = true;
    };
};

function changeStepN() {
    touchEndMoveDis = touchMoveDis * (1 + factor * simpleEaseOut(1 - frameIndex / 20, 3));
    imgBoxM.style.webkitTransform = "translate3d("+Math.round(touchEndMoveDis)+"px,0,0)";
    imgBoxR.style.webkitTransform = "translate3d("+Math.round(touchEndMoveDis+moveDis)+"px,0,0)";
    if (!separate && frameIndex < 13) {
        btnAnimation.style.webkitTransform = "translate3d(0,-" + (112 * frameIndex) + "px,0)";
    };
    frameIndex -= 1;
    if (frameIndex < 0) {
        afterChangeStepN();
    } else {
        window.requestAnimationFrame(changeStepN);
    };
};

function changeStepP() {
    touchEndMoveDis = touchMoveDis * (1 + factor * simpleEaseOut(1 - frameIndex / 20, 3));
    imgBoxL.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis - moveDis) + "px,0,0)";
    imgBoxM.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    if (!separate && frameIndex < 13) {
        btnAnimation.style.webkitTransform = "translate3d(0,-" + (112 * frameIndex) + "px,0)";
    };
    frameIndex -= 1;
    if (frameIndex < 0) {
        afterChangeStepP();
    } else {
        window.requestAnimationFrame(changeStepP);
    };
};

function notChangeStepP() {
    touchEndMoveDis = touchMoveDis * simpleEaseInOut(frameIndex / 20, 2);
    frameIndex -= 1;
    imgBoxL.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis - moveDis) + "px,0,0)";
    imgBoxM.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    if (frameIndex < 0) {
        animationing = false;
        if (slideChangeStep2 && !touchEnd) {
            touchStartPos = touchMovePos;
            slideChangeStep();
            slideChangeStep2 = false;
        };
    } else {
        window.requestAnimationFrame(notChangeStepP);
    };
};

function notChangeStepN() {
    touchEndMoveDis = touchMoveDis * simpleEaseInOut(frameIndex / 20, 2);
    frameIndex -= 1;
    imgBoxM.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    imgBoxR.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis + moveDis) + "px,0,0)";
    if (frameIndex < 0) {
        animationing = false;
        if (slideChangeStep2 && !touchEnd) {
            touchStartPos = touchMovePos;
            slideChangeStep();
            slideChangeStep2 = false;
        };
    } else {
        window.requestAnimationFrame(notChangeStepN);
    };
};


function afterChangeStepN() {
    animationing = false;
    if (!separate) {
        separate = true;
        btnFrameIndex = 0;
        imgBoxM.style.backgroundImage = "url(images/" + padding(currentStep) + "_S.png)";
    };
    currentStep += 1;
    stepText.innerHTML = padding(currentStep);
    imgBoxL.style.webkitTransform = "translate3d(" + moveDis + "px,0,0)";
    imgBoxL.style.backgroundImage = "url(images/" + padding(currentStep+1) + "_S.png)";
    mainAnimationImage.src = "images/" + padding(currentStep) + "_Animation.png";
    var first = imgBox.shift();
    imgBox.push(first);
    imgBoxL = imgBox[0];
    imgBoxM = imgBox[1];
    imgBoxR = imgBox[2];
    if (slideChangeStep2 && !touchEnd) {
        touchStartPos = touchMovePos;
        slideChangeStep();
        slideChangeStep2 = false;
    };
};

function afterChangeStepP() {
    animationing = false;
    if (!separate) {
        separate = true;//按钮状态归位
        btnFrameIndex = 0;//按钮动画帧数归零
        imgBoxM.style.backgroundImage = "url(images/" + padding(currentStep) + "_S.png)";//图片恢复为分离状态的图片
    };
    //改变标题栏的步骤
    currentStep -= 1;
    stepText.innerHTML = padding(currentStep);
    //将图片位置归位，并且替换图片
    imgBoxR.style.webkitTransform = "translate3d(" + moveDis + "px,0,0)";
    imgBoxR.style.backgroundImage = "url(images/" + padding(currentStep-1) + "_S.png)";
    //替换主动画图片
    mainAnimationImage.src = "images/" + padding(currentStep) + "_Animation.png";
    //将图片数组的排列顺序归位
    var first = imgBox.shift();
    imgBox.push(first);
    first = imgBox.shift();
    imgBox.push(first);
    imgBoxL = imgBox[0];
    imgBoxM = imgBox[1];
    imgBoxR = imgBox[2];
    if (slideChangeStep2 && !touchEnd) {
        touchStartPos = touchMovePos;
        slideChangeStep();
        slideChangeStep2 = false;
    };
};


//==========================================按钮翻页===================================

function changeStepN_Btn() {
    touchEndMoveDis = -moveDis * simpleEaseInOut(1 - frameIndex / 20, 3);
    imgBoxM.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    imgBoxR.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis + moveDis) + "px,0,0)";
    nextGlow.style.opacity = frameIndex / 20;
    if (!separate && frameIndex < 13) {
        btnAnimation.style.webkitTransform = "translate3d(0,-" + (112 * frameIndex) + "px,0)";
    };
    frameIndex -= 1;
    if (frameIndex < 0) {
        afterChangeStepN();
    } else {
        window.requestAnimationFrame(changeStepN_Btn);
    };
};

function changeStepP_Btn() {
    touchEndMoveDis = moveDis * simpleEaseInOut(1 - frameIndex / 20, 3);
    imgBoxM.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    imgBoxL.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis - moveDis) + "px,0,0)";
    previousGlow.style.opacity = frameIndex / 20;
    if (!separate && frameIndex < 13) {
        btnAnimation.style.webkitTransform = "translate3d(0,-" + (112 * frameIndex) + "px,0)";
    };
    frameIndex -= 1;
    if (frameIndex < 0) {
        afterChangeStepP();
    } else {
        window.requestAnimationFrame(changeStepP_Btn);
    };
};


function notChangeStepN_Btn() {
    touchEndMoveDis = -moveDis / 2 * simpleEaseInOutBack(1 - frameIndex / 20, 3);
    imgBoxM.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    imgBoxR.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis + moveDis) + "px,0,0)";
    nextGlow.style.opacity = frameIndex / 20;
    frameIndex -= 1;
    if (frameIndex < 0) {

    } else {
        window.requestAnimationFrame(notChangeStepN_Btn);
    };
};

function notChangeStepP_Btn() {
    touchEndMoveDis = moveDis / 2 * simpleEaseInOutBack(1 - frameIndex / 20, 3);
    imgBoxM.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    imgBoxL.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis - moveDis) + "px,0,0)";
    previousGlow.style.opacity = frameIndex / 20;
    frameIndex -= 1;
    if (frameIndex < 0) {

    } else {
        window.requestAnimationFrame(notChangeStepP_Btn);
    };
};





//==========================================滑动开启菜单栏===================================

var menuOpened = false;
var touchMoveDis2;

function slideOpenMenu() {
    if (!touchEnd) {
        touchMoveDis = touchMovePos - touchStartPos;
        if (touchMoveDis > 240) {
            touchMoveDis = 240;
        } else if (touchMoveDis < 0) {
            touchMoveDis = 0;
        };
        mainBox.style.webkitTransform = "translate3d(" + (touchMoveDis) + "px,0,0)";
        menuBox.style.webkitTransform = "translate3d(" + Math.round(touchMoveDis/2-120) + "px,0,0)";
        window.requestAnimationFrame(slideOpenMenu);
    } else {
        if (touchMoveDis <= 0) {
            return;
        };
        animationing = true;
        frameIndex = 30;
        if (touchMoveDis > 60) {
            factor = 240/touchMoveDis-1;
            openMenu();
        } else {
            touchMoveDis -= 240;
            closeMenu();
        };
    };
};

function slideCloseMenu() {
    if (!touchEnd) {
        touchMoveDis = touchMovePos - touchStartPos;
        if (touchMoveDis < -240) {
            touchMoveDis = -240;
        } else if (touchMoveDis > 0) {
            touchMoveDis = 0;
        };
        mainBox.style.webkitTransform = "translate3d(" + (240 + touchMoveDis) + "px,0,0)";
        menuBox.style.webkitTransform = "translate3d(" + Math.round((240 + touchMoveDis)/2-120) + "px,0,0)";
        window.requestAnimationFrame(slideCloseMenu);
    } else {
        if (touchMoveDis >= 0) {
            //关闭菜单栏
            animationing = true;
            frameIndex = 36;
            closeMenu_Btn();
            return;
        };
        animationing = true;
        frameIndex = 30;
        if (touchMoveDis < -60) {
            closeMenu();
        } else {
            touchMoveDis += 240;
            factor = 240/touchMoveDis-1;
            openMenu();
        };
    };
};


function openMenu() {
    touchEndMoveDis = touchMoveDis * (1 + factor * (1 - Math.pow(frameIndex / 30, 8)));
    frameIndex -= 1;
    mainBox.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    menuBox.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis/2-120) + "px,0,0)";
    if (frameIndex < 0) {
        if (!menuOpened) {
            menuOpened = true;
            openMenuTouchArea.style.width = "100%";
        };
        animationing = false;
    } else {
        window.requestAnimationFrame(openMenu);
    };
};

function closeMenu() {
    touchEndMoveDis = (240 + touchMoveDis) * Math.pow(frameIndex / 30, 8);
    frameIndex -= 1;
    mainBox.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    menuBox.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis/2-120) + "px,0,0)";
    if (frameIndex < 0) {
        if (menuOpened) {
            menuOpened = false;
            openMenuTouchArea.style.width = "16px";
        };
        animationing = false;
    } else {
        window.requestAnimationFrame(closeMenu);
    };
};




//====================================按钮开启菜单栏==========================================

function openMenu_Btn() {
    touchEndMoveDis = 240 * (1-Math.pow(frameIndex / 36, 8));
    frameIndex -= 1;
    mainBox.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    menuBox.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis/2-120) + "px,0,0)";
    if (frameIndex < 0) {
        menuOpened = true;
        openMenuTouchArea.style.width = "100%";
        animationing = false;
    } else {
        window.requestAnimationFrame(openMenu_Btn);
    };
};

function closeMenu_Btn() {
    touchEndMoveDis = 240 * Math.pow(frameIndex / 36, 8);
    frameIndex -= 1;
    mainBox.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis) + "px,0,0)";
    menuBox.style.webkitTransform = "translate3d(" + Math.round(touchEndMoveDis/2-120) + "px,0,0)";
    if (frameIndex < 0) {
        menuOpened = false;
        openMenuTouchArea.style.width = "16px";
        animationing = false;
    } else {
        window.requestAnimationFrame(closeMenu_Btn);
    };
};




// ======================================主动画=============================================

mainAnimation.width = 400;
mainAnimation.height = 400;
var cxt = mainAnimation.getContext("2d"),
    mainAnimationImage = new Image(),
    frameIndex = 0,
    btnFrameIndex = 0,
    ticksPerFrame = 1,
    tickCount = 0;
mainAnimationImage.src = "images/001_Animation.png";

function mainAnimationC() {
    if (frameIndex < 19) {
        if (btnFrameIndex < 12) {
            btnFrameIndex += 1;
            btnAnimation.style.webkitTransform = "translate3d(0,-" + (112 * btnFrameIndex) + "px,0)";
        };
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            frameIndex += 1;
            cxt.drawImage(mainAnimationImage,
            0,400 * frameIndex, 400, 400, 0, 0, 400, 400);
        } else {
            tickCount += 1;
        };
        window.requestAnimationFrame(mainAnimationC);
    } else if (frameIndex == 19) {
        imgBoxM.style.backgroundImage = "url(images/" + padding(currentStep) + "_C.png)";
        frameIndex += 1;
        window.requestAnimationFrame(mainAnimationC);
    } else if (frameIndex < 24) {
        frameIndex += 1;
        window.requestAnimationFrame(mainAnimationC);
    } else {
        animationing = false;
        separate = false;
        cxt.clearRect(0, 0, 400, 400);
    }; 
};

function mainAnimationS() {
    if (frameIndex > 0) {
        if (btnFrameIndex > 0) {
            btnFrameIndex -= 1;
            btnAnimation.style.webkitTransform = "translate3d(0,-" + (112 * btnFrameIndex) + "px,0)";
        };
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            frameIndex -= 1;
            cxt.drawImage(mainAnimationImage,
            0,400 * frameIndex,400,400,0,0, 400, 400);
        } else {
            tickCount += 1;
        };
        window.requestAnimationFrame(mainAnimationS);
    } else if (frameIndex == 0) {
        imgBoxM.style.backgroundImage = "url(images/" + padding(currentStep) + "_S.png)";
        frameIndex -= 1;
        window.requestAnimationFrame(mainAnimationS);
    } else if (frameIndex > -5) {
        frameIndex -= 1;
        window.requestAnimationFrame(mainAnimationS);
    } else {
        animationing = false;
        separate = true;
        cxt.clearRect(0, 0, 400, 400);
    }; 
};




//================================================菜单栏============================================

function selectColor(item) {
    lastColorItem.style.backgroundPositionY = "0";
    item.style.backgroundPositionY = "-50px";
    lastColorItem = item;
};


//================================================设置页==========================================
var currentLang = "en",
    zhRadioBtn = document.getElementById("zhRadioBtn"),
    enRadioBtn = document.getElementById("enRadioBtn"),
    saveSwitchTouchArea = document.getElementById("saveSwitchTouchArea"),
    saveSwitch = document.getElementById("saveSwitch"),
    saveStateOn = true,
    savedStep = document.getElementById("savedStep"),
    speedSliderTouchArea = document.getElementById("speedSliderTouchArea"),
    speedSlider = document.getElementById("speedSlider");


function changeLangZh() {
    zhRadioBtn.style.webkitTransform = "scale3d(1,1,1)";
    enRadioBtn.style.webkitTransform = "scale3d(0,0,1)";
    currentLang = "zh";
};

function changeLangEn() {
    zhRadioBtn.style.webkitTransform = "scale3d(0,0,1)";
    enRadioBtn.style.webkitTransform = "scale3d(1,1,1)";
    currentLang = "en";
};

function turnOnSave() {
    saveSwitch.style.webkitTransform = "translate3d(0,0,0)";
    saveSwitch.style.webkitFilter = "grayscale(0)";
    savedStep.innerHTML = "Current Step - " + currentStep;
    saveStateOn = true;
};

function turnOffSave() {
    saveSwitch.style.webkitTransform = "translate3d(-24px,0,0)";
    saveSwitch.style.webkitFilter = "grayscale(100%)";
    savedStep.innerHTML = "Not Save";
    saveStateOn = false;
}

zh.addEventListener('touchend', function(){
    if (currentLang != "zh") {
        changeLangZh();
    };
}, false);

en.addEventListener('touchend', function(){
    if (currentLang != "en") {
        changeLangEn();
    };
}, false);

saveSwitchTouchArea.addEventListener('touchend', function(){
    if (saveStateOn) {
        turnOffSave();
    } else {
        turnOnSave();
    };
}, false);

speedSliderTouchArea.addEventListener('touchend', function(e){
    changeSpeed(e.changedTouches[0].clientX);
}, false);

function changeSpeed(pos){
    if (pos < 60) {
        speedSlider.style.webkitTransform = "translate3d(-170px,0,0)";
    } else if (pos < 120) {
        speedSlider.style.webkitTransform = "translate3d(-115px,0,0)";
    } else if (pos < 180) {
        speedSlider.style.webkitTransform = "translate3d(-55px,0,0)";
    } else {
        speedSlider.style.webkitTransform = "translate3d(0,0,0)";
    };
};


// ===========================================事件监听================================================


$(window).bind('onorientationchange resize', function() {
    resize();
});
resize();

menuBtn.addEventListener('touchend', function(){
    // selectStep($contentsItem[currentStep-1]);
    if (!animationing) {
        animationing = true;
        frameIndex = 36;
        if (menuOpened) {
            closeMenu_Btn();
        } else {
            openMenu_Btn();
        };
    };
}, false);

$mainMask.bind('touchstart', function() { 
    closeMenuBar();
});

$contentsTab.bind('touchstart', function() { 
    menuTagTo(this,"0","0");
});

$searchTab.bind('touchstart', function() { 
    menuTagTo(this,"5em","-15em");
});

$settingTab.bind('touchstart', function() { 
    menuTagTo(this,"10em","-30em");
});

menuBox.addEventListener('touchmove', function(){
    dragging = true;
}, false);


$contentsItem.bind('touchend', function() { 
    if (!dragging) {
        changeStepJ(($contentsItem.index(this))+1);
        selectStep(this);
        closeMenuBar();
    };
    dragging = false;
});

$colorItem.bind('touchend', function() { 
    selectColor(this);
});

nextBtn.addEventListener('touchstart', function(){
    if (!animationing) {
        frameIndex = 20;
        if (currentStep != maxStep) {
            changeStepN_Btn();
        } else {
            notChangeStepN_Btn();
        };
    };
}, false);

previousBtn.addEventListener('touchstart', function(){
    if (!animationing) {
        frameIndex = 20;
        if (currentStep != 1) {
            changeStepP_Btn();
        } else {
            notChangeStepP_Btn();
        };
    };
}, false);

btnAnimation.addEventListener('touchend', function(){
    if (!animationing) {
        animationing = true;
        if (separate) {
            frameIndex = 0;
            btnFrameIndex = 0;
            mainAnimationC();
        }else {
            frameIndex = 19;
            btnFrameIndex = 12;
            mainAnimationS();
        };
    };
    
}, false);

aniBox1.addEventListener('touchstart', function(e){
    if (!animationing) {
        touchStartPos = e.touches[0].clientX;
        touchMovePos = touchStartPos;
        touchEnd = false;
        slideChangeStep();
    } else {
        //如果第一次滑动未结束就触发了touchstart事件，
        //就在第一次滑动结束后立即触发slideChangeStep函数.
        slideChangeStep2 = true;
        touchStartPos = e.touches[0].clientX;
        touchMovePos = touchStartPos;
        touchEnd = false;
    };
}, false);

aniBox1.addEventListener('touchmove', function(e){
    touchMovePos = e.touches[0].clientX;
}, false);

aniBox1.addEventListener('touchend', function(e){
    touchEnd = true;
}, false);

openMenuTouchArea.addEventListener('touchstart', function(e){
    if (!animationing) {
        touchStartPos = e.touches[0].clientX;
        touchMovePos = touchStartPos;
        touchEnd = false;
        if (menuOpened) {
            slideCloseMenu();
        } else {
            slideOpenMenu();
        };
    };
}, false);

openMenuTouchArea.addEventListener('touchmove', function(e){
    touchMovePos = e.touches[0].clientX;
}, false);

openMenuTouchArea.addEventListener('touchend', function(e){
    touchEnd = true;
}, false);


});