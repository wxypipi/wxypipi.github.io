
$(document).ready(function(){
    $("#menuBtn").click(function(){
        var mainBox = $("#mainBox");
        // alert(mainBox.css("-webkit-transform"));
        if(mainBox.css("-webkit-transform") != "matrix(1, 0, 0, 1, 0, 0)"){
            mainBox.css("-webkit-transform","translate3d(0, 0, 0)");
            // alert("yes");
        }
        else{
            mainBox.css("-webkit-transform","translate3d(15em, 0, 0)");
            // alert("no");
        };
    });

    $("#contentsBtn").click(function(){
        $("#menu").css("-webkit-transform","translate3d(0, 0, 0)");
        $("#contentsBtn").css("box-shadow","0 -0.5em orange inset");
        $("#searchBtn").css("box-shadow","0 0 orange inset");
        $("#settingBtn").css("box-shadow","0 0 orange inset");
    });
    $("#searchBtn").click(function(){
        $("#menu").css("-webkit-transform","translate3d(-15em, 0, 0)");
        $("#searchBtn").css("box-shadow","0 -0.5em orange inset");
        $("#contentsBtn").css("box-shadow","0 0 orange inset");
        $("#settingBtn").css("box-shadow","0 0 orange inset");
    });
    $("#settingBtn").click(function(){
        $("#menu").css("-webkit-transform","translate3d(-30em, 0, 0)");
        $("#settingBtn").css("box-shadow","0 -0.5em orange inset");
        $("#searchBtn").css("box-shadow","0 0 orange inset");
        $("#contentsBtn").css("box-shadow","0 0 orange inset");
    });
});