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
    $menuBtn = $("#menuBtn,#headerText"),
    $mainMask = $("#mainMask"),
    $contentsItem = $("#contentsPage li li"),
    $colorItem = $("#panelColor li"),
    $previousBtn = $("#previousBtn"),
    $nextBtn = $("#nextBtn"),
    // $previousGlow = $("#previousGlow"),
    previousGlow = document.getElementById("previousGlow"),
    // $nextGlow = $("#nextGlow"),
    nextGlow = document.getElementById("nextGlow"),
    // $aniBtnBox = $("#aniBtnBox"),
    // $aniBox1 = $("#aniBox1"),
    // $aniBox2 = $("#aniBox2"),
    imgL = document.getElementById("imgL"),
    imgR = document.getElementById("imgR"),
    imgM = document.getElementById("imgM"),
    imgBox1 = document.getElementById("imgBox1"),
    imgBox2 = document.getElementById("imgBox2"),
    imgBox3 = document.getElementById("imgBox3"),
    imgBox = [imgBox1,imgBox2,imgBox3],
    aniBox1 = document.getElementById("aniBox1"),
    aniBox2 = document.getElementById("aniBox2"),
    stepText = document.getElementById("stepText"),
    // gradient = document.getElementById("menuFooterGradient"),
    mainAnimation = document.getElementById("mainAnimation"),
    btnAnimation = document.getElementById("btnAnimation"),
    lastContentsItem = false,
    lastColorItem = $colorItem[0],
    separate = true,
    // isChangeStep = true,
    currentStep = 1,
    maxStep = 4,
    dragging = false,
    moveDis = 0
    ;

function resize() {
    // 删掉上次resize后产生的style
    var style = document.getElementsByTagName("style")[0];
    if (style) {
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
    
    imgBox[0].style.webkitTransform = "translate3d(-" + moveDis + "px,0,0)";
    imgBox[1].style.webkitTransform = "translate3d(0,0,0)";
    imgBox[2].style.webkitTransform = "translate3d(" + moveDis + "px,0,0)";
    
    // alert(moveDis);

    var cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    var rules = document.createTextNode(
    "#aniBox2 li{"+
        "position: absolute;"+
        "display: block;"+
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
        "left: " + ((width - newWidth) / 2) + "px}"+

    '@-webkit-keyframes moveR {'+
    'from {-webkit-transform: translate3d(0, 0, 0)}'+
    'to {-webkit-transform: translate3d('+moveDis+'px, 0, 0)}}'+
    '@-webkit-keyframes moveL {'+
    'from {-webkit-transform: translate3d(0, 0, 0)}'+
    'to {-webkit-transform: translate3d(-'+moveDis+'px, 0, 0)}}');

    cssAnimation.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(cssAnimation);
};

function openMenuBar() {
    mainBox.style.webkitTransform = "translate3d(15em, 0, 0)";
    menuBox.style.webkitTransform = "translate3d(0, 0, 0)";
    mainMask.style.pointerEvents = "auto";
};

function closeMenuBar() {
    mainBox.style.webkitTransform = "translate3d(0em, 0, 0)";
    menuBox.style.webkitTransform = "translate3d(-8em, 0, 0)";
    mainMask.style.pointerEvents = "none";
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
        lastContentsItem.style.color = "#B0B9C6";
    };
    item.style.backgroundPosition = "0 0";
    item.style.color = "#EAEAEA";
    lastContentsItem = item;
};

function changeStepN() {
    if (currentStep == maxStep) {
        nextGlow.style.backgroundColor = "#FF9D82";
        mask.style.display = "none";
        return
    };
    aniBox2.style.webkitAnimation = "moveL 0.3s forwards ease-in-out";
    if (!separate) {
        btnAnimationS();
    };
    currentStep += 1;
    stepText.innerHTML = padding(currentStep);
};

function changeStepP() {
    if (currentStep == 1) {
        previousGlow.style.backgroundColor = "#FF9D82";
        mask.style.display = "none";
        return
    };
    aniBox2.style.webkitAnimation = "moveR 0.3s forwards ease-in-out";
    if (!separate) {
        btnAnimationS();
    };
    currentStep -= 1;
    stepText.innerHTML = padding(currentStep);
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

aniBox2.addEventListener('webkitAnimationEnd', function(){
    if (currentStep == 1) {
        imgM.src = "images/001_S.png";
        setTimeout(function(){
            aniBox2.style.webkitAnimation = "none";
            // console.log("now!");
            setTimeout(function(){
                imgR.src = "images/002_S.png";
                // imgAnimation.src = "images/001_Animation.png";
                mask.style.display = "none";
            },10);
        },20);
    }else if (currentStep == maxStep) {
        imgM.src = "images/" + padding(currentStep) + "_S.png";
        setTimeout(function(){
            aniBox2.style.webkitAnimation = "none";
            // console.log("now!");
            setTimeout(function(){
                imgL.src = "images/" + padding(currentStep-1) + "_S.png";
                // imgAnimation.src = "images/" + padding(currentStep) + "_Animation.png";
                mask.style.display = "none";
            },10);  
        },20);      
    }else {
        imgM.src = "images/" + padding(currentStep) + "_S.png";
        setTimeout(function(){
            aniBox2.style.webkitAnimation = "none";
            // console.log("now!");
            setTimeout(function(){
                imgL.src = "images/" + padding(currentStep-1) + "_S.png";
                imgR.src = "images/" + padding(currentStep+1) + "_S.png";
                // imgAnimation.src = "images/" + padding(currentStep) + "_Animation.png";
                mask.style.display = "none";
            },10);  
        },20);
    };

    nextGlow.style.backgroundColor = "#C6C6C6";
    previousGlow.style.backgroundColor = "#C6C6C6";
    frameIndex = 0;//切换步骤时让动画回到第一帧，否则无法再次触发动画。
    mainAnimationImage.src = "images/" + padding(currentStep) + "_Animation.png";

}, false);

function padding(n) {
    return(("00" + n).slice(-3));
};

function btnAnimationS() {
    btnAnimation.style.webkitTransform = "translate3d(0,0,0)";
    separate = true;
};

function btnAnimationC() {
    btnAnimation.style.webkitTransform = "translate3d(0,-84em,0)";
    separate = false;
};

// ================================================================


mainAnimation.width = 400;
mainAnimation.height = 400;
var cxt = mainAnimation.getContext("2d");
var mainAnimationImage = new Image();
    mainAnimationImage.src = "images/001_Animation.png";
var frameIndex = 0;
var ticksPerFrame = 1;
var tickCount = 0;

function mainAnimationC() {
    if (frameIndex < 19) {
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            frameIndex += 1;
            cxt.drawImage(mainAnimationImage,
            0,400 * frameIndex, 400, 400, 0, 0, 400, 400);
        } else {
            tickCount += 1;
        };
        window.requestAnimationFrame(mainAnimationC);
    } else {
        window.cancelAnimationFrame(mainAnimationC);
        cxt.clearRect(0, 0, 400, 400);
    }; 
};

function mainAnimationS() {
    if (frameIndex > 0) {
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            frameIndex -= 1;
            cxt.drawImage(mainAnimationImage,
            0,400 * frameIndex,400,400,0,0, 400, 400);
        } else {
            tickCount += 1;
        }
        window.requestAnimationFrame(mainAnimationS);
    } else {
        window.cancelAnimationFrame(mainAnimationS);
        cxt.clearRect(0, 0, 400, 400);
    }; 
};

// ================================================================

function selectColor(item) {
    lastColorItem.style.backgroundPositionY = "0";
    item.style.backgroundPositionY = "-50px";
    lastColorItem = item;
};


$(window).bind('onorientationchange resize', function() {
    resize();
});
resize();

$menuBtn.bind('touchend', function() {
    selectStep($contentsItem[currentStep-1]);
    openMenuBar();
});

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

$previousBtn.bind('touchstart', function() { 
    mask.style.display = "block";
    previousGlow.style.webkitAnimation = "glow 0.3s linear";
    changeStepP();
});

previousGlow.addEventListener('webkitAnimationEnd', function(){
    previousGlow.style.webkitAnimation = "none";
}, false);

$nextBtn.bind('touchstart', function() { 
    mask.style.display = "block";
    nextGlow.style.webkitAnimation = "glow 0.3s linear";
    changeStepN();
});

nextGlow.addEventListener('webkitAnimationEnd', function(){
    nextGlow.style.webkitAnimation = "none";
}, false);


btnAnimation.addEventListener('touchstart', function(){
    // mask.style.display = "block";
    if (separate) {
        btnAnimationC();
        mainAnimationC();
    }else {
        btnAnimationS();
        mainAnimationS();
    };
}, false);

btnAnimation.addEventListener('webkitTransitionEnd', function(){
    if (separate) {
        imgM.src = "images/" + padding(currentStep) + "_S.png";
    }else {
        imgM.src = "images/" + padding(currentStep) + "_C.png";
    };
}, false);

var touchPos = 0;


aniBox1.addEventListener('touchstart', function(e){
    imgBox[0].style.webkitTransition = "none";
    imgBox[1].style.webkitTransition = "none";
    imgBox[2].style.webkitTransition = "none";

    touchPos = e.touches[0].clientX;
    // console.log(aaa);
    // alert("here");
}, false);

aniBox1.addEventListener('touchmove', function(e){
    var aaa = (e.touches[0].clientX) - touchPos;
    // console.log(aaa - touchPos);
    // alert("here");
    imgBox[0].style.webkitTransform = "translate3d(" + (- moveDis + aaa) + "px,0,0)";
    imgBox[1].style.webkitTransform = "translate3d(" + aaa + "px,0,0)";
    imgBox[2].style.webkitTransform = "translate3d(" + (moveDis + aaa) + "px,0,0)";
    

}, false);

aniBox1.addEventListener('touchend', function(e){
    

    var aaa = e.changedTouches[0].clientX
    if (aaa > touchPos) {
        imgBox[0].style.webkitTransition = "-webkit-transform 0.2s ease-out";
        imgBox[1].style.webkitTransition = "-webkit-transform 0.2s ease-out";

        imgBox[0].style.webkitTransform = "translate3d(0,0,0)";
        imgBox[1].style.webkitTransform = "translate3d(" + moveDis + "px,0,0)";
        imgBox[2].style.webkitTransform = "translate3d(-" + moveDis + "px,0,0)";

        var first = imgBox.shift();
        imgBox.push(first);
        first = imgBox.shift();
        imgBox.push(first);
    } else if (aaa < touchPos) {
        imgBox[1].style.webkitTransition = "-webkit-transform 0.2s ease-out";
        imgBox[2].style.webkitTransition = "-webkit-transform 0.2s ease-out";

        imgBox[0].style.webkitTransform = "translate3d(" + moveDis + "px,0,0)";
        imgBox[1].style.webkitTransform = "translate3d(-" + moveDis + "px,0,0)";
        imgBox[2].style.webkitTransform = "translate3d(0,0,0)";

        var first = imgBox.shift();
        imgBox.push(first);
    };
    // console.log(aaa);
    // alert("here");
}, false);


// function imagesPreload(){
//     var images = ["images/001.png","images/mainAnimationTest.png","images/001_end.png"];
//     var i = 0;
//     preload();
//     function preload(){
//         var j = new Image();
//         j.src = images[i];
//         i += 1;
//         j.onload = function() {
//             if (i == 3) {
//                 stepText.innerHTML = "loaded";
//                 return;
//             };
//             preload();
//         };
//     };
//  };

//  imagesPreload();


    // '@-webkit-keyframes mainAnimationC {'+
    // 'from {-webkit-transform: translate3d(0, -'+newWidth+'px, 0)}'+
    // 'to {-webkit-transform: translate3d( 0, -'+(newWidth*20)+'px, 0)}}'+

    // '@-webkit-keyframes mainAnimationS {'+
    // 'from {-webkit-transform: translate3d(0, -'+(newWidth*20)+'px, 0)}'+
    // 'to {-webkit-transform: translate3d( 0, -'+newWidth+'px, 0)}}'

// 这个方法太麻烦了
// function changeStep(target) {

//     if (target < 1 || target == currentStep || target > 3) {
//         return;
//     };

//     $nonCurrent.css({"background":"url(./images/testimg00" + target + ".png)",
//                      "background-size":"100% 100%"});

//     if (target > currentStep) {
//         $nonCurrent.css("-webkit-animation","changeStepR 0.3s forwards reverse ease-in-out");
//         $current.css("-webkit-animation","changeStepL 0.3s forwards ease-in-out ");
//     }else{
//         $nonCurrent.css("-webkit-animation","changeStepL 0.3s forwards reverse ease-in-out");
//         $current.css("-webkit-animation","changeStepR 0.3s forwards ease-in-out ");
//     };

//     $nonCurrent.css("display","block");

//     if (separate == false) {
//         btnAnimation();
//     };

//     setTimeout(function(){
//         $current.css("display","none");
//         $nonCurrent.css({"-webkit-animation":"none"});
//         $current.css({"-webkit-animation":"none"});
//         $nonCurrent.attr("title",target);
//         currentStep = target;
//         var $xxxx = $current;
//         $current = $nonCurrent;
//         $nonCurrent = $xxxx;
//     },300);

// };


// 用js实现css sprite动画，可能性能没有用css实现的好
// function btnAnimation() {
//     var i = 0;
//     var n;
//     if (separate) {
//         n = 0;
//         separate = false;
//     }else {
//         n = -12;
//         separate = true;
//     }
//     aaa();
//     function aaa() {
//         $aniBtn.css("background","url(./images/button.png) 0 -" + (Math.abs(n)*7) + "em");
//         $aniBtn.css("background-size","7em 91em");
//         n += 1;
//         i += 1;
//         if (i>12) {
//             return;
//         };
//         setTimeout(function(){
//             aaa();
//         },30);
//     }; 
    
// };


// 用css的animation实现css sprite动画，没有用css的transition方便
// function btnAnimation() {
//     if (separate) {
//         $aniBtn.css({"-webkit-animation":"changePos steps(12) 0.3s forwards",
//                      "background-position":"0em -84em"});
//         separate = false;
//         setTimeout(function(){
//             $aniBtn.css("-webkit-animation","none")
//         },300);
//     }else {
//         $aniBtn.css({"-webkit-animation":"changePos steps(12) 0.3s forwards reverse",
//                      "background-position":"0 0"});
//         separate = true;
//         setTimeout(function(){
//             $aniBtn.css("-webkit-animation","none")
//         },300);
//     };
// };

// function mainAnimationS() {
//     $imageM.css("-webkit-animation","animation 0.5s steps(7) forwards reverse");
//     setTimeout(function(){
//         $imageM.css("-webkit-animation","none");
//         $imageM.css("-webkit-transform","translate3d(0, 0, 0)");
//     },600);
// };

// function mainAnimationC() {
//     $imageM.css("-webkit-animation","animation 0.5s steps(7) forwards");
//     setTimeout(function(){
//         $imageM.css("-webkit-animation","none");
//         $imageM.css("-webkit-transform","translate3d(0, -87.5%, 0)");
//     },600);
// };

// UC和海豚兼容但是效果怪怪的
// function btnGlow(glowObj) {
//     glowObj.css("-webkit-transition","-webkit-transform 0.3s,background-color 0.3s");
//     glowObj.css("background-color","#EAEAEA");
//     glowObj.css("-webkit-transform","scale3d(2, 2, 1)");
//     setTimeout(function(){
//         glowObj.css("-webkit-transition","none");
//         glowObj.css("-webkit-transform","scale3d(0.9, 0.9, 1)");
//         glowObj.css("background-color","#65B89C");
//     },310);  
// };


// 在pc版chrome上没问题，但是在移动版chrome上显示不正常，套在里面的几个div变成方的了
// $aniBtn.bind('touchend', function() { 
//     $aniBtn.css("-webkit-transform","translate(0, 0) scale3d(1,1,1)");
// });

// 不加这句的话没有触摸事件的元素上方覆盖的透明元素的触摸事件也会失效（菜单栏收不回去）
// 禁用掉默认的touchmove事件后好像就不用这句了
// $("body").bind('touchend', function() {
// });

// function changeStep(target) {
//     if (target == 0 || target > maxStep || target == currentStep) {
//         return;
//     }else if (target - currentStep == 1) {
//         $aniBox2.css("-webkit-animation","moveL 0.3s forwards ease-in-out");
//     }else if (currentStep - target == 1) {
//         $aniBox2.css("-webkit-animation","moveR 0.3s forwards ease-in-out");
//     }else {
//         if (target == 1) {
//             $aniBox2.css("background-image","url(./images/001.png), none, url(./images/002.png)");
//             $previousGlow.css("background-color","#FF9D82");
//         }else if (target == maxStep) {
//             $aniBox2.css("background-image","url(./images/" + padding(target) + ".png), " +
//                                         "url(./images/" + padding((target-1)) + ".png)");
//             $nextGlow.css("background-color","#FF9D82");
//         }else {
//             $aniBox2.css("background-image","url(./images/" + padding(target) + ".png), " +
//                                         "url(./images/" + padding((target-1)) + ".png), "+
//                                         "url(./images/" + padding((target+1)) + ".png)");
//             $previousGlow.css("background-color","#65B89C");
//             $nextGlow.css("background-color","#65B89C");
//         };
//     };

//     if (!separate) {
//         btnAnimationS();
//     };

//     currentStep = target;
//     $stepText.empty();
//     $stepText.append(padding(currentStep));
    
//     $aniBox2.bind('webkitAnimationEnd', function() {
//         if (target == 1) {
//             $aniBox2.css("background-image","url(./images/001.png), none, url(./images/002.png)");
//             $previousGlow.css("background-color","#FF9D82");
//         }else if (target == maxStep) {
//             $aniBox2.css("background-image","url(./images/" + padding(target) + ".png), " +
//                                         "url(./images/" + padding((target-1)) + ".png)");
//             $nextGlow.css("background-color","#FF9D82");
//         }else {
//             $aniBox2.css("background-image","url(./images/" + padding(target) + ".png), " +
//                                         "url(./images/" + padding((target-1)) + ".png), "+
//                                         "url(./images/" + padding((target+1)) + ".png)");
//             $previousGlow.css("background-color","#65B89C");
//             $nextGlow.css("background-color","#65B89C");
//         };
//         $aniBox2.css("-webkit-animation","none");
//         $aniBox2.unbind();
//     });

    // function afterChangeStep() {
    //     if (target == 1) {
    //         $aniBox2.css("background-image","url(./images/001.png), none, url(./images/002.png)");
    //         $previousGlow.css("background-color","#FF9D82");
    //     }else if (target == maxStep) {
    //         $aniBox2.css("background-image","url(./images/" + padding(target) + ".png), " +
    //                                     "url(./images/" + padding((target-1)) + ".png)");
    //         $nextGlow.css("background-color","#FF9D82");
    //     }else {
    //         $aniBox2.css("background-image","url(./images/" + padding(target) + ".png), " +
    //                                     "url(./images/" + padding((target-1)) + ".png), "+
    //                                     "url(./images/" + padding((target+1)) + ".png)");
    //         $previousGlow.css("background-color","#65B89C");
    //         $nextGlow.css("background-color","#65B89C");
    //     };
    //     $aniBox2.css("-webkit-animation","none");
    // };
// };

    
    // $aniBox2.css({"height":newWidth + "px",
    //               "width":newBoxwidth + "px",
    //               "margin-top":marginTop + "px",
    //               "left":"-" + newWidth + "px",
    //               // "background-position":moveDis + "px 0, " + "0 0, " + moveDis*2 + "px 0",
    //               // "background-size":newWidth + "px " + newWidth + "px"
    // });

    // imgM.style.height = newWidth + "px";
    // imgM.style.width = newWidth + "px";
    // imgM.style.backgroundSize = newWidth + "px " + newWidth + "px";
    // imgL.style.height = newWidth + "px";
    // imgL.style.width = newWidth + "px";
    // imgL.style.backgroundSize = newWidth + "px " + newWidth + "px";
    // imgR.style.height = newWidth + "px";
    // imgR.style.width = newWidth + "px";
    // imgR.style.backgroundSize = newWidth + "px " + newWidth + "px";


    // $animation1.css({"height":(newWidth*8) + "px",
    //                 "width":newWidth + "px",
    //                 "top":(newWidth+marginTop) + "px",
    //                 // "background-position":"0 0, 0 " + (newWidth*8) + "px, 0 " + (newWidth*16) + "px",
    //                 "background-size":newWidth + "px " + (newWidth*8) + "px"
    // });

// function mainAnimationS() {
//     var i = 23;
//     changeImage();
//     function changeImage() {
//         imgM.src = "images/testAnimation/001_00" + padding(i) + ".png";
//         // imgM.src = "url(images/testAnimation/001_00" + padding(i) + ".png)";
//         i -= 1;
//         if (i < 0) {
//             return;
//         };
//         setTimeout(function(){
//             changeImage();
//         },40)
//     };
// };

// function mainAnimationC() {
//     var i = 0;
//     changeImage();
//     function changeImage() {
//         imgM.src = "images/testAnimation/001_00" + padding(i) + ".png";
//         // imgM.src = "url(images/testAnimation/001_00" + padding(i) + ".png)";
//         i += 1;
//         if (i > 23) {
//             return;
//         };
//         setTimeout(function(){
//             changeImage();
//         },40)
//     };
// };

// function mainAnimationC2() {
//     imgM.style.height = "auto";
//     imgM.src = "images/1_1.png";
//     var i = 0;
//     var j = 0;
//     var a = setInterval(function(){
//         imgM.style.webkitTransform = "translate3d(0,-" + i*newWidth + "px,0)";
//         i += 1;
//         if (i == 7) {
//             imgM.src = "images/1_2.png";
//             imgM.style.top = String(-newWidth*8);
//         };
//         if (i == 15) {
//             imgM.src = "images/1_3.png";
//             imgM.style.top = String(-newWidth*16);
//         };
//         if (i == 23) {
//             clearInterval(a);
//         };
//     }, 30);
// };

// function mainAnimationS2() {
//     isChangeStep = false;
//     // imgM.style.height = "auto";
//     imgM.src = "images/mainAnimationTest.png";
//     imgM.style.webkitTransform = "translate3d(0, -" + (newWidth*19) +"px, 0)"
//     setTimeout(function(){
//         imgM.style.webkitAnimation = "mainAnimation 0.75s reverse steps(20)";
//         imgM.style.webkitTransform = "none";
//     },200); 
// };

// function mainAnimationS() {
//     var i = 23;
//     var a = setInterval(function(){
//         imgM.src = "images/1_1.png";
//         i -= 1;
//         if (i < 0) {
//             clearInterval(a);
//         };
//     }, 40);
// };

// function mainAnimationC() {
//     var i = 0;
//     var a = setInterval(function(){
//         imgM.src = "./images/testAnimation/001_00" + padding(i) + ".png";
//         i += 1;
//         if (i > 23) {
//             clearInterval(a);
//         };
//     }, 40);
// };

// aniBtn.addEventListener('webkitTransitionEnd', function(){
//     if (separate) {
//         mainAnimationS();
//     }else{
//         mainAnimationC();
//     };
// }, false);



// canvas test====================================================




// var coinImage = new Image();
// coinImage.src = "images/001_Animation.png";

// function sprite (options) {
                
//     var that = {},
//         frameIndex = 0,
//         tickCount = 0,
//         ticksPerFrame = options.ticksPerFrame || 0;
//         numberOfFrames = options.numberOfFrames || 1;
                    
//     that.context = options.context;
//     that.width = options.width;
//     that.height = options.height;
//     that.image = options.image;
//     that.loop = options.loop;

//     that.render = function () {
//         that.context.clearRect(0, 0, that.width, that.height);
//         that.context.drawImage(
//            that.image,
//            0,
//            400 * frameIndex,
//            400,
//            400,
//            0,
//            0,
//            that.width,
//            that.height);
//     };

//     that.update = function () {
//         tickCount += 1;
            
//         if (tickCount > ticksPerFrame) {
//             tickCount = 0;
//             if (frameIndex < numberOfFrames - 1) {  
//                 frameIndex += 1;
//             } else if (that.loop) {
//                 frameIndex = 0;
//             } else {
//                 // frameIndex = 0;
//                 animationStop = true;
//             };
//         };
//     }; 

//     return that;
// };




// var mainAnimationC = sprite({
//     context: canvas.getContext("2d"),
//     width: 320,
//     height: 320,
//     image: coinImage,
//     numberOfFrames: 20,
//     ticksPerFrame: 2,
//     // loop: true
// });

// // coinImage.addEventListener("load", gameLoop);

// function gameLoop () {
//     if (animationStop) {
//         window.cancelAnimationFrame(gameLoop);
//         mainAnimationC.context.clearRect(0, 0, mainAnimationC.width, mainAnimationC.height);
//         animationStop = false;
//     }else{
//         window.requestAnimationFrame(gameLoop);
//         mainAnimationC.update();
//         mainAnimationC.render();
//     };
  
    
// }


// function mainAnimationC() {
//     isChangeStep = false;
//     // imgAnimation.style.webkitAnimation = "mainAnimationC 0.5s forwards steps(19)";
// };

// function mainAnimationS() {
//     isChangeStep = false;
//     // imgAnimation.style.webkitAnimation = "mainAnimationS 0.5s forwards steps(19)";
// };

});