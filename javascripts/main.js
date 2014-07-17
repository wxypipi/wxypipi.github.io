alert("run");

// var mainBox = $("#mainBox"),
// menuBox = $("#menuBox"),
// mainMask = $("#mainMask");


function openMenuBar() {
    $("#mainBox").css("-webkit-transform","translate3d(15em, 0, 0)");
    $("#menuBox").css("-webkit-transform","translate3d(0, 0, 0)");
    $("#mainMask").css("pointer-events","auto");
};

function closeMenuBar() {
    $("#mainBox").css("-webkit-transform","translate3d(0em, 0, 0)");
    $("#menuBox").css("-webkit-transform","translate3d(-8, 0, 0)");
    $("#mainMask").css("pointer-events","none");
};

function menuTagTo(tag) {
    $("#contentsBtn").css("box-shadow","0 0 #FF8164 inset");
    $("#searchBtn").css("box-shadow","0 0 #FF8164 inset");
    $("#settingBtn").css("box-shadow","0 0 #FF8164 inset");
    if (tag == "content") {
        $("#menu").css("-webkit-transform","translate3d(0, 0, 0)");
        $("#contentsBtn").css("box-shadow","0 -0.25em #FF8164 inset");
    }else if (tag == "search") {
        $("#menu").css("-webkit-transform","translate3d(-15em, 0, 0)");
        $("#searchBtn").css("box-shadow","0 -0.25em #FF8164 inset");
    }else {
        $("#menu").css("-webkit-transform","translate3d(-30em, 0, 0)");
        $("#settingBtn").css("box-shadow","0 -0.25em #FF8164 inset");
    }
};


$(document).ready(function(){
    
    $("#menuBtn").click(function(){
        openMenuBar();
    });

    $("#mainMask").click(function(){
        closeMenuBar();
    });
    $("#contentsBtn").click(function(){
        menuTagTo("content");
    });
    $("#searchBtn").click(function(){
        menuTagTo("search");
    });
    $("#settingBtn").click(function(){
        menuTagTo("setting");
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