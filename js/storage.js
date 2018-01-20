
/*闭包写的工具类 */
(function ($) {
    var webStorage = webStorage || {};
    var localStorage = window.localStorage; 

    webStorage.getItem  =  function (key) {
        var value = localStorage.getItem(key)
        if ( value == null) {
            return '';
        } else {
            return value;
        }
    }
    
    webStorage.setItem  =  function (key, value) {
        localStorage.setItem(key, value);
    }

    webStorage.checkPrivLogin = function () {
        var privLoginPassWd = this.getItem('privLoginPassWd');
        var passwd_1 = md5(privLoginPassWd);
        var passwd_2 = webGlobal.privateLoginPassWd; // 123hong
        if (passwd_1 == passwd_2) {
            return true;
        } else {
            return false;
        }
    }

    webStorage.checkPrivScan = function () {
        var privateScanPassWd = this.getItem('privateScanPassWd');
        var passwd_1 = md5(privateScanPassWd);
        var passwd_2 = webGlobal.privateScanPassWd; // 123hong
        if (passwd_1 == passwd_2) {
            return true;
        } else {
            return false;
        }
    }

    // 暴露给window
    window['webStorage'] = webStorage; 

})($);

/*
Usage:

webStorage.setItem('aa', 'ddd');
b = webStorage.getItem('AAA');
console.log(b);

 */