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
    $animation1 = $("#animation1"),
    $animation2 = $("#animation2"),
    $current = $animation1
    ;

function resize() {
    var height = Number($aniBox1.css("height").slice(0,-2));
    var width = Number($aniBox1.css("width").slice(0,-2));
    // alert(height + " " + width);
    if (height > width) {
        $aniBox2.css({"height":width + "px",
                        "width":width + "px",
                        "margin-top":((height - width) / 1.8) + "px"
        });
        // moveDis = width;
    }else{
        $aniBox2.css({"height":(height*0.9) + "px",
                        "width":(height*0.9) + "px",
                        "margin-top":(height*0.07) + "px"
        });
        // moveDis = (width/2)+(height*0.9/2);
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

// UC和海豚不兼容
function btnGlow(glowObj) {
    glowObj.css("-webkit-animation","glow 0.3s cubic-bezier(0, .36, .44, .84)");
    setTimeout(function(){
        glowObj.css("-webkit-animation","none")
    },300);
};

function changeStep(target) {
    if ($animation1.css("display") == "none") {
        $current = $animation2;
        $nonCurrent = $animation1;
    }else{
        $current = $animation1;
        $nonCurrent = $animation2;
    };

    $nonCurrent.css({"-webkit-animation":"changeStepR 0.3s forwards reverse ease-in-out "
                  
    });
    $current.css({"-webkit-animation":"changeStepL 0.3s forwards ease-in-out "
                     
    });

    $nonCurrent.css("display","block");

    setTimeout(function(){
        $current.css("display","none");
    },300);

};


// alert($animation2.css("display"));

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
});

$nextBtn.bind('touchstart', function() { 
    btnGlow($nextGlow);
});

$aniBtn.bind('touchstart', function() { 
    btnAnimation();
    // alert($aniBtn.css("background"));
});





$nextBtn.bind('touchend', function() { 
    changeStep(0);
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