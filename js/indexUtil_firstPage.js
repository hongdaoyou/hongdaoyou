
/*闭包写的工具类 */
(function ($) {

    $('#privateLoginId').click(function () {
        var inputPassWd = prompt('Input PassWd');
        if (inputPassWd == '' || inputPassWd == null) {
            return;
        }
        var passwd_1 = md5(inputPassWd);
        var passwd_2 = webGlobal.privateLoginPassWd; // 123hong
        if (passwd_1 == passwd_2) {
            webStorage.setItem('privLoginPassWd', inputPassWd);
            //window.location = "";
            window.open(webGlobal.indexBackGroundPage );     
        } else {
             return;
        }
    });

    $('#privateScanId').click(function () {
        var inputPassWd = prompt('Input PassWd');
        if (inputPassWd == '' || inputPassWd == null) {
            return;
        }
        var passwd_1 = md5(inputPassWd);
        var passwd_2 = webGlobal.privateScanPassWd; // 123hong
        if (passwd_1 == passwd_2) {
            webStorage.setItem('privateScanPassWd', inputPassWd);
            //window.location = "";
            window.open(webGlobal.indexPrivScanPage);     
        } else {
             return;
        }
    });
    

})($);
