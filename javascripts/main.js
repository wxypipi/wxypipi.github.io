
$(document).ready(function(){
    $("#menuBtn").click(function(){
        var mainBox = $("#mainBox");
        var menuBox = $("#menuBox")
        // var menuMask = $("#menuMask")
        // alert(mainBox.css("-webkit-transform"));
        if(mainBox.css("-webkit-transform") != "matrix(1, 0, 0, 1, 0, 0)"){
            mainBox.css("-webkit-transform","translate3d(0, 0, 0)");
            // menuMask.css("background-color","rgba(0,0,0,0.8)");
            menuBox.css("-webkit-transform","translate3d(-8em, 0, 0)");
            // menuMask.css("display","block");

            // alert("yes");
        }
        else{
            mainBox.css("-webkit-transform","translate3d(15em, 0, 0)");
            // menuMask.css("background-color","rgba(0,0,0,0)");
            menuBox.css("-webkit-transform","translate3d(0, 0, 0)");
            // menuMask.css("display","none");
            // alert("no");
        };
    });

    $("#contentsBtn").click(function(){
        $("#menu").css("-webkit-transform","translate3d(0, 0, 0)");
        $("#contentsBtn").css("box-shadow","0 -0.375em #FF8164 inset");
        $("#searchBtn").css("box-shadow","0 0 #FF8164 inset");
        $("#settingBtn").css("box-shadow","0 0 #FF8164 inset");
    });
    $("#searchBtn").click(function(){
        $("#menu").css("-webkit-transform","translate3d(-15em, 0, 0)");
        $("#searchBtn").css("box-shadow","0 -0.375em #FF8164 inset");
        $("#contentsBtn").css("box-shadow","0 0 #FF8164 inset");
        $("#settingBtn").css("box-shadow","0 0 #FF8164 inset");
    });
    $("#settingBtn").click(function(){
        $("#menu").css("-webkit-transform","translate3d(-30em, 0, 0)");
        $("#settingBtn").css("box-shadow","0 -0.375em #FF8164 inset");
        $("#searchBtn").css("box-shadow","0 0 #FF8164 inset");
        $("#contentsBtn").css("box-shadow","0 0 #FF8164 inset");
    });
});