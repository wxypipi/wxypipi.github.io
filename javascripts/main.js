$(document).ready(function(){

document.body.addEventListener('touchmove',function(e){
      e.preventDefault();
  });

//uses document because document will be topmost level in bubbling
var selScrollable = '.scrollable';
// Uses document because document will be topmost level in bubbling
$(document).on('touchmove',function(e){
  e.preventDefault();
});
// Uses body because jQuery on events are called off of the element they are
// added to, so bubbling would not work if we used document instead.
$('body').on('touchstart', selScrollable, function(e) {
  if (e.currentTarget.scrollTop === 0) {
    e.currentTarget.scrollTop = 1;
  } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
    e.currentTarget.scrollTop -= 1;
  }
});
// Stops preventDefault from being called on document if it sees a scrollable div
$('body').on('touchmove', selScrollable, function(e) {
  e.stopPropagation();
});

// alert("run");

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
    if(lastItem){
        $lastItem.css("box-shadow","0 0 #FF8164 inset");
    };
    $item.css("box-shadow","0.25em 0 #FF8164 inset");
};


function resetGlow(glowObj) {
    glowObj.removeAttr("style");
    glowObj.css("-webkit-transform","scale3d(1, 1, 1)");
    glowObj.css("background-color","#65B89C");
    // alert(glowObj.css("-webkit-transition"));
};


function btnGlow(glowObj) {
    glowObj.css("-webkit-animation","glow 0.3s");
    setTimeout(function(){
        glowObj.css("-webkit-animation","none")
    },300);
};
    

$menuBtn.click(function(){
    openMenuBar();
});

$mainMask.click(function(){
    closeMenuBar();
});

$contentsBtn.click(function(){
    menuTagTo(this,"0");
});

$searchBtn.click(function(){
    menuTagTo(this,"-15em");
});

$settingBtn.click(function(){
    menuTagTo(this,"-30em");
});

$contentsItem.click(function(){
    selectItem(this);
    lastItem = this;
    closeMenuBar();
});

$previousBtn.click(function(){
    btnGlow($previousGlow);
});

$nextBtn.click(function(){
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