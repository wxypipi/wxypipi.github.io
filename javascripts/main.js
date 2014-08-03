$(document).ready(function(){


// function imagesPreload(){
//     var i = 0;
//     preload();
//     function preload(){
//         var j = new Image();
//         j.src = "images/testAnimation/001_00" + padding(i) + ".png";
//         i += 1;
//         j.onload = function() {
//             if (i > 23) {
//                 stepText.innerHTML = "loaded";
//                 return;
//             };
//             preload();
//         };
//     };
//  };

//  imagesPreload();



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

var $mainBox = $("#mainBox"),
    $menuBox = $("#menuBox"),
    $mainMask = $("#mainMask"),
    mask = document.getElementById("mask"),
    mainBox = document.getElementById("mainBox"),
    menuBox = document.getElementById("menuBox"),
    mainMask = document.getElementById("mainMask"),
    $contentsBtn = $("#contentsBtn"),
    $searchBtn = $("#searchBtn"),
    $settingBtn = $("#settingBtn"),
    $menu = $("#menu"),
    menuFooterLine = document.getElementById("menuFooterLine"),
    $menuBtn = $("#menuBtn,#headerText"),
    $mainMask = $("#mainMask"),
    $contentsItem = $("#contentsPage li li"),
    $previousBtn = $("#previousBtn"),
    $nextBtn = $("#nextBtn"),
    $previousGlow = $("#previousGlow"),
    previousGlow = document.getElementById("previousGlow"),
    $nextGlow = $("#nextGlow"),
    nextGlow = document.getElementById("nextGlow"),
    $aniBtn = $("#aniBtnBox"),
    aniBtn = document.getElementById("aniBtnBox"),
    $aniBox1 = $("#aniBox1"),
    $aniBox2 = $("#aniBox2"),
    imgL = document.getElementById("imgL"),
    imgR = document.getElementById("imgR"),
    imgM = document.getElementById("imgM"),
    // imgBoxL = document.getElementById("imgBoxL"),
    // imgBoxR = document.getElementById("imgBoxR"),
    // imgBoxM = document.getElementById("imgBoxM"),
    aniBox2 = document.getElementById("aniBox2"),
    mainAnimation = document.getElementById("mainAnimation"),
    stepText = document.getElementById("stepText"),
    gradient = document.getElementById("menuFooterGradient"),
    // $animation1 = $("#animation1"),
    lastItem = false,
    separate = true,
    isChangeStep = true,
    currentStep = 1,
    maxStep = 4
    ;

function resize() {
    $("style").remove();
    var height = Number($aniBox1.css("height").slice(0,-2));
    var width = Number($aniBox1.css("width").slice(0,-2));
    if (height > width) {
        var moveDis = width;
        newWidth = width;
        var newBoxwidth = width*3;
        var marginTop = (height - width) / 2;
    }else{
        var moveDis = (width+height)/2;
        newWidth = height;
        var newBoxwidth = width+height*2;
        var marginTop = 0;
    };

    var cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    var rules = document.createTextNode(
    "#imgBoxM,#imgBoxL,#imgBoxR,#imgM,#imgL,#imgR,#mainAnimation{"+
        "height: " + newWidth + "px;"+
        "width: " + newWidth + "px;}"+
        // "background-size: " + newWidth + "px " + newWidth + "px}"+
    "#aniBox2{"+
        "height: " + newWidth + "px;"+
        "width: " + newBoxwidth + "px;"+
        "margin-top: " + marginTop + "px;"+
        "left: -" + newWidth + "px}"+

    "#mainAni1,#mainAni2,#mainAni3{"+
        "height: " + newWidth*8 + "px;"+
        "width: " + newWidth + "px;"+
        "z-index: 100}"+

    "#mainAnimation{"+
        "top: " + (marginTop + newWidth) + "px}"+
        // "float: left}"+

    '@-webkit-keyframes moveR {'+
    'from {-webkit-transform: translate3d(0, 0, 0)}'+
    'to {-webkit-transform: translate3d('+moveDis+'px, 0, 0)}}'+
    '@-webkit-keyframes moveL {'+
    'from {-webkit-transform: translate3d(0, 0, 0)}'+
    'to {-webkit-transform: translate3d(-'+moveDis+'px, 0, 0)}}'+

    '@-webkit-keyframes animation1 {'+
    'from {-webkit-transform: translate3d(0, 0, 0)}'+
    'to {-webkit-transform: translate3d( 0, -'+(newWidth*7)+'px, 0)}}'+

    '@-webkit-keyframes mainAnimation {'+
    'from {-webkit-transform: translate3d(0, 0, 0)}'+
    'to {-webkit-transform: translate3d( 0, -'+(newWidth*19)+'px, 0)}}'
    );
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
    $contentsBtn.css("opacity","0.8");
    $searchBtn.css("opacity","0.8");
    $settingBtn.css("opacity","0.8");
    $tag.css("opacity","1");
    menuFooterLine.style.webkitTransform = "translate3d(" + lineTranslate + ", 0, 0)"
    $menu.css("-webkit-transform","translate3d(" + pageTranslate + ", 0, 0)");
};

function selectStep(item) {
    if (item == lastItem) {
        return;
    };
    if(lastItem){
        lastItem.style.backgroundPosition = "0 -48px";
        lastItem.style.color = "#9A9FA8";
    };
    item.style.backgroundPosition = "0 0";
    item.style.color = "#CCD3DD";
    lastItem = item;
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
        imgM.src = "images/001.png";
        imgR.src = "images/002.png";
    }else if (target == maxStep) {
        imgM.src = "images/" + padding(target) + ".png";
        imgL.src = "images/" + padding(target-1) + ".png";
    }else {
        imgM.src = "images/" + padding(target) + ".png";
        imgL.src = "images/" + padding(target-1) + ".png";
        imgR.src = "images/" + padding(target+1) + ".png";
    };
    if (!separate) {
        btnAnimationS();
    };
    currentStep = target;
    stepText.innerHTML = padding(currentStep);
};

aniBox2.addEventListener('webkitAnimationEnd', function(){
    if (isChangeStep) {
        if (currentStep == 1) {
            imgM.src = "images/001.png";
            setTimeout(function(){
                aniBox2.style.webkitAnimation = "none";
                // console.log("now!");
                setTimeout(function(){
                    imgR.src = "images/002.png";
                    // console.log("now!!!");
                    mask.style.display = "none";
                },10);
            },20);
        }else if (currentStep == maxStep) {
            imgM.src = "images/" + padding(currentStep) + ".png";
            setTimeout(function(){
                aniBox2.style.webkitAnimation = "none";
                // console.log("now!");
                setTimeout(function(){
                    imgL.src = "images/" + padding(currentStep-1) + ".png";
                    // console.log("now!!!");
                    mask.style.display = "none";
                },10);  
            },20);      
        }else {
            imgM.src = "images/" + padding(currentStep) + ".png";
            setTimeout(function(){
                aniBox2.style.webkitAnimation = "none";
                // console.log("now!");
                setTimeout(function(){
                    imgL.src = "images/" + padding(currentStep-1) + ".png";
                    imgR.src = "images/" + padding(currentStep+1) + ".png";
                    // console.log("now!!!");
                    mask.style.display = "none";
                },10);  
            },20);
        };
    
        nextGlow.style.backgroundColor = "#C6C6C6";
        previousGlow.style.backgroundColor = "#C6C6C6";
    }else{
        isChangeStep = true;
        imgM.src = "images/" + padding(currentStep) + "_end.png";
        imgM.style.webkitAnimation = "none";
    };
}, false);

function padding(n) {
    return(("00" + n).slice(-3));
};

function btnAnimation() {
    if (separate) {
        aniBtn.style.backgroundPosition = "0em -84em";
        separate = false;
    }else {
        aniBtn.style.backgroundPosition = "0 0";
        separate = true;
    };
};

function btnAnimationS() {
    aniBtn.style.webkitTransform = "translate3d(0,0,0)";
    separate = true;
};

function btnAnimationC() {
    aniBtn.style.webkitTransform = "translate3d(0,-84em,0)";
    separate = false;
};

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

function mainAnimationS() {
    var i = 23;
    var a = setInterval(function(){
        imgM.src = "images/1_1.png";
        i -= 1;
        if (i < 0) {
            clearInterval(a);
        };
    }, 40);
};

function mainAnimationC() {
    var i = 0;
    var a = setInterval(function(){
        imgM.src = "./images/testAnimation/001_00" + padding(i) + ".png";
        i += 1;
        if (i > 23) {
            clearInterval(a);
        };
    }, 40);
};


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


function mainAnimationC2() {
    isChangeStep = false;
    imgM.style.height = "auto";
    imgM.src = "images/mainAnimationTest.png";
    imgM.style.webkitAnimation = "mainAnimation 0.75s steps(19)";
    
};

function mainAnimationS2() {
    imgM.style.webkitAnimation = "none";
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

$contentsBtn.bind('touchstart', function() { 
    menuTagTo(this,"0","0");
});

$searchBtn.bind('touchstart', function() { 
    menuTagTo(this,"5em","-15em");
});

$settingBtn.bind('touchstart', function() { 
    menuTagTo(this,"10em","-30em");
});

$contentsItem.bind('touchend', function() { 
    changeStepJ(($contentsItem.index(this))+1);
    selectStep(this);
    closeMenuBar();
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

$aniBtn.bind('touchstart', function() { 
    if (separate) {
        btnAnimationC();
        mainAnimationC2();
    }else {
        btnAnimationS();
        // mainAnimationS2();
    };
});




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

});