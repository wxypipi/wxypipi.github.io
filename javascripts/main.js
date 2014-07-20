$(document).ready(function(){

// document.body.addEventListener('touchmove',function(e){
//       e.preventDefault();
//   });


alert("run");

var $mainBox = $("#mainBox"),
    $menuBox = $("#menuBox"),
    $mainMask = $("#mainMask"),
    $contentsBtn = $("#contentsBtn"),
    $searchBtn = $("#searchBtn"),
    $settingBtn = $("#settingBtn"),
    $menu = $("#menu"),
    $menuBtn = $("#menuBtn"),
    $mainMask = $("#mainMask"),
    $contentsItem = $("#contentsPage li li"),
    lastItem = false,
    $previousBtn = $("#previousBtn"),
    $nextBtn = $("#nextBtn"),
    $previousGlow = $("#previousGlow")
    $nextGlow = $("#nextGlow")
    ;

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
// function btnGlow(glowObj) {
//     glowObj.css("-webkit-animation","glow 0.3s cubic-bezier(0, .36, .44, .84)");
//     setTimeout(function(){
//         glowObj.css("-webkit-animation","none")
//     },300);
// };

function btnGlow(glowObj) {
    glowObj.css("-webkit-transition","-webkit-transform 0.3s,background-color 0.3s");
    glowObj.css("background-color","#EAEAEA");
    glowObj.css("-webkit-transform","scale3d(2, 2, 1)");
    setTimeout(function(){
        glowObj.css("-webkit-transition","none");
        glowObj.css("-webkit-transform","scale3d(0.9, 0.9, 1)");
        glowObj.css("background-color","#65B89C");
    },310);  
};


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
    // $contentsItem.bind('touchend', function() { 

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