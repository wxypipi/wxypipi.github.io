$(document).ready(function(){

// document.body.addEventListener('touchmove',function(e){
//       e.preventDefault();
//   });


// alert("run");

var $mainBox = $("#mainBox"),
    $menuBox = $("#menuBox"),
    $mainMask = $("#mainMask"),
    $contentsBtn = $("#contentsBtn"),
    $searchBtn = $("#searchBtn"),
    $settingBtn = $("#settingBtn"),
    $menu = $("#menu"),
    $menuBtn = $("#menuBtn,#headerText"),
    $mainMask = $("#mainMask"),
    $contentsItem = $("#contentsPage li li"),
    lastItem = false,
    $previousBtn = $("#previousBtn"),
    $nextBtn = $("#nextBtn"),
    $previousGlow = $("#previousGlow"),
    $nextGlow = $("#nextGlow"),
    // $aniBtn = $("#aniBtnR,#aniBtnG,#aniBtnB,#GBb,#GRr,#RBb,#RGBb")
    $aniBtn = $("#aniBtnBox"),
    separate = true,
    // moveDis = 0,
    $aniBox1 = $("#aniBox1"),
    $aniBox2 = $("#aniBox2"),
    $aniBox3 = $("#aniBox3"),
    $animationL = $("#animationL"),
    $animationM = $("#animationM"),
    $animationR = $("#animationR"),
    $animationAll = $("#animationL,#animationM,#animationR"),
    // $current = $animation1,
    // $nonCurrent = $animation2,
    currentStep = 1,
    maxStep = 3
    ;

function resize() {
    var height = Number($aniBox1.css("height").slice(0,-2));
    var width = Number($aniBox1.css("width").slice(0,-2));
    // alert(height + " " + width);
    if (height > width) {
        $aniBox3.css({"height":width + "px",
                      "width":(width*3) + "px",
                      "margin-top":((height - width) / 1.8) + "px",
                      "left":"-" + width + "px"
        });
        $aniBox2.css("width",width + "px");
        $animationAll.css({"height":width + "px",
                           "width":width + "px"
        });
    }else{
        $aniBox3.css({"height":height + "px",
                      "width":(width+height*2) + "px",
                      "left":"-" + height + "px",
                      "margin-top":"0",
        });
        $aniBox2.css("width",((width+height)/2) + "px");
        $animationAll.css({"height":height + "px",
                           "width":height + "px"
        });
    };
};


function openMenuBar() {
    $mainBox.css("-webkit-transform","translate3d(15em, 0, 0)");
    $menuBox.css("-webkit-transform","translate3d(0, 0, 0)");
    $mainMask.css("pointer-events","auto");
};

function closeMenuBar() {
    $mainBox.css("-webkit-transform","translate3d(0em, 0, 0)");
    $menuBox.css("-webkit-transform","translate3d(-8em, 0, 0)");
    $mainMask.css("pointer-events","none");
};

function menuTagTo(tag,translateX) {
    var $tag = $(tag);
    $contentsBtn.css("box-shadow","0 0 #FF8164 inset");
    $searchBtn.css("box-shadow","0 0 #FF8164 inset");
    $settingBtn.css("box-shadow","0 0 #FF8164 inset");
    $tag.css("box-shadow","0 -0.25em #FF8164 inset");
    $menu.css("-webkit-transform","translate3d(" + translateX + ", 0, 0)");
};

function selectItem(item) {
    var $item = $(item);
    var $lastItem = $(lastItem);
    setTimeout(function(){
        if(lastItem){
            $lastItem.css("box-shadow","0 0 #FF8164 inset");
        };
        $item.css("box-shadow","0.25em 0 #FF8164 inset");
    },100);
};

function changeStep(target) {
    if (target < 1 || target == currentStep || target > maxStep) {
        return;
    };

    if (target > currentStep) {
        $aniBox2.css("-webkit-animation","moveL 0.3s forwards ease-in-out");
    }else{
        $aniBox2.css("-webkit-animation","moveR 0.3s forwards ease-in-out");
    };

    if (separate == false) {
        btnAnimation();
    };

    setTimeout(function(){
        $animationM.css("background-image","url(./images/testimg00" + target + ".png)");
        $aniBox2.css("-webkit-animation","none");
        if (target != 1) {
            $animationL.css("background-image","url(./images/testimg00" + (target-1) + ".png)");
        };
        if (target != maxStep) {
            $animationR.css("background-image","url(./images/testimg00" + (target+1) + ".png)");
        };
        currentStep = target;
    },350);

}


// UC和海豚不兼容
function btnGlow(glowObj) {
    glowObj.css("-webkit-animation","glow 0.3s cubic-bezier(0, .36, .44, .84)");
    setTimeout(function(){
        glowObj.css("-webkit-animation","none")
    },300);
};



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

function btnAnimation() {
    if (separate) {
        $aniBtn.css("background-position","0em -84em");
        separate = false;
    }else {
        $aniBtn.css("background-position","0 0");
        separate = true;
    };
};

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
$("body").bind('touchend', function() {
});

$(window).resize(function() {
  resize();
});

$(window).bind('onorientationchange', function() {
    resize();
});

resize();

$menuBtn.bind('touchend', function() {
    openMenuBar();
});

$mainMask.bind('touchstart', function() { 
    closeMenuBar();
});

$contentsBtn.bind('touchstart', function() { 
    menuTagTo(this,"0");
});

$searchBtn.bind('touchstart', function() { 
    menuTagTo(this,"-15em");
});

$settingBtn.bind('touchstart', function() { 
    menuTagTo(this,"-30em");
});

$contentsItem.bind('touchend', function() { 
    selectItem(this);
    lastItem = this;
    closeMenuBar();
});

$previousBtn.bind('touchstart', function() { 
    btnGlow($previousGlow);
    changeStep(currentStep - 1);
});

$nextBtn.bind('touchstart', function() { 
    btnGlow($nextGlow);
    changeStep(currentStep + 1);
});

$aniBtn.bind('touchstart', function() { 
    btnAnimation();
    // alert($aniBtn.css("background"));
});


//     $("#menuBtn").click(function(){
//         var mainBox = $("#mainBox");
//         var menuBox = $("#menuBox");
//         // var menuMask = $("#menuMask")
//         // alert(mainBox.css("-webkit-transform"));
//         if(mainBox.css("-webkit-transform") != "matrix(1, 0, 0, 1, 0, 0)"){
//             mainBox.css("-webkit-transform","translate3d(0, 0, 0)");
//             // menuMask.css("background-color","rgba(0,0,0,0.8)");
//             menuBox.css("-webkit-transform","translate3d(-8em, 0, 0)");
//             // menuMask.css("display","block");

//             // alert("yes");
//         }
//         else{
//             mainBox.css("-webkit-transform","translate3d(15em, 0, 0)");
//             // menuMask.css("background-color","rgba(0,0,0,0)");
//             menuBox.css("-webkit-transform","translate3d(0, 0, 0)");
//             // menuMask.css("display","none");
//             // alert("no");
//         };
//     });

//     $("#contentsBtn").click(function(){
//         $("#menu").css("-webkit-transform","translate3d(0, 0, 0)");
//         $("#contentsBtn").css("box-shadow","0 -0.25em #FF8164 inset");
//         $("#searchBtn").css("box-shadow","0 0 #FF8164 inset");
//         $("#settingBtn").css("box-shadow","0 0 #FF8164 inset");
//     });
//     $("#searchBtn").click(function(){
//         $("#menu").css("-webkit-transform","translate3d(-15em, 0, 0)");
//         $("#searchBtn").css("box-shadow","0 -0.25em #FF8164 inset");
//         $("#contentsBtn").css("box-shadow","0 0 #FF8164 inset");
//         $("#settingBtn").css("box-shadow","0 0 #FF8164 inset");
//     });
//     $("#settingBtn").click(function(){
//         $("#menu").css("-webkit-transform","translate3d(-30em, 0, 0)");
//         $("#settingBtn").css("box-shadow","0 -0.25em #FF8164 inset");
//         $("#searchBtn").css("box-shadow","0 0 #FF8164 inset");
//         $("#contentsBtn").css("box-shadow","0 0 #FF8164 inset");
//     });
});