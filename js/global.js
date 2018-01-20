
/*闭包写的工具类 */
(function ($) {
    var webGlobal = webGlobal || {};
    var localStorage = window.localStorage; 

    webGlobal.indexPage = "index.html";
    webGlobal.indexBackGroundPage = "index-backGround.html";
    webGlobal.indexPrivScanPage = "indexPrivScanPage.html";


    //私有后台 密码
    webGlobal.privateLoginPassWd = "2cab7b8526ffc44181570666f4d04040";
    //浏览页面 密码
    webGlobal.privateScanPassWd = "2cab7b8526ffc44181570666f4d04040";

    
    // 暴露给window
    window['webGlobal'] = webGlobal; 

})($);

/*
Usage:


 */