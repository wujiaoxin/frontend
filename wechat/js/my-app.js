var mainUrl = 'http://t.torser.cn' ;
// Initialize your app
var myApp = new Framework7({
	modalTitle: "利通金服",
    modalButtonCancel: "取消",
    modalButtonOk: "确认",
    modalPreloaderTitle: "正在加载",
    showBarsOnPageScrollTop: true
});

// Export selectors engine
var $$ = Dom7;

//ajax 请求
function ajax_jquery(options) {
    if (options == undefined) {
        options = new Object();
    } else if (typeof options != 'object') {
        return;
    } 
    var sid = localStorage.getItem('sid');
    var options_default = {
        url: mainUrl,
        type: 'POST',
        dataType: 'json',
        cache: false,
        beforeSend: myApp.showIndicator(),
        data: {
            sid: sid
        },
        success: _ajax_success,
        error: _ajax_error,
        complete: myApp.hideIndicator(),
        timeout: 60000,
        async: true,
    };
    var options_merge = new Object();
    $.extend(true,options_merge, options_default, options);
    $.ajax(options_merge);
}

function getSid(){
	localStorage.clear();
	ajax_jquery({
        url: mainUrl + '/api/session/create',
        data: {
        	'client': 'wechat'
        },
        success: function (resp) {
           localStorage.setItem('sid',resp.data.sid)
        }
    });
}
/**
 * 请求成功后的回调函数
 * @param data 由服务器返回，并根据dataType参数进行处理后的数据
 * @param textStatus 描述状态的字符串
 */
function _ajax_success(data, textStatus) {
    // data 可能是 xmlDoc, jsonObj, html, text, 等等...
    this; // 调用本次AJAX请求时传递的options参数
}

/**
 * ajax 请求失败时调用此函数
 * @param XMLHttpRequest XMLHttpRequest对象
 * @param textStatus 错误信息 可以是null 、"timeout" 、"error" 、"notmodified" 或 "parsererror"。
 * @param errorThrown 捕获的异常对象（可选）
 */
function _ajax_error(XMLHttpRequest, textStatus, errorThrown) {
    // 通常 textStatus 和 errorThrown 之中只有一个会包含信息
//    this; // 调用本次AJAX请求时传递的options参数
    var session_status = XMLHttpRequest.getResponseHeader("Session-Status"); //通过XMLHttpRequest取得响应头，Session-Status，
    if (session_status == 'TimeOut') {
        layer.msg('登录超时，请重新登录', function () {
            window.location.href = "/wechat/index/login"; //如果超时就处理 ，指定要跳转的页面
        });
    } else if (session_status == 'Empty') {
        layer.msg('权限限制，请联系管理员');
    } else if (textStatus == 'timeout') {
        layer.msg('加载超时，请重试');
    } else {
        console.log("XHR="+XMLHttpRequest+"\ntextStatus="+textStatus+"\nerrorThrown=" + errorThrown);
    }
}


//验证手机号
function validatePhoneNumber(mobile) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|145|147|222)+\d{8})$/;
    if (!myreg.test(mobile)) {
        return false;
    } else {
        return true
    }
}

//验证交易密码
function validatePayPwd(pwd) {
    var myreg = /^\d{6}$/;
    if (!myreg.test(pwd)) {
        return false;
    } else {
        return true
    }
}

//验证密码
function validatePassword(pass) {
	if (pass.length < 6 || pass.length > 20) {
        return false;
    }else{
    	return true;
    }
    // if (pass.length < 6 || pass.length > 20 || pass.match(/[^a-zA-Z0-9]+/)) {
    //     return false;
    // }
    // var ls = 0;
    // if (pass.match(/(([a-z])|([A-Z]))+/)) {
    //     ls++;
    // }
    // if (pass.match(/([0-9])+/)) {
    //     ls++;
    // }
    // if (ls < 2) {
    //     return false;
    // } else {
    //     return true;
    // }
}


//验证银行卡号
function validateBankNum(banknum) {
    if (banknum.length < 12 || banknum.length > 30) {
        return false;
    } else {
        var num = /^\d*$/;  //全数字
        if (!num.exec(banknum)) {
            return false;
        } else {
            return true;
        }
    }
}


//验证身份证格式
function validateIdCard(pId) {
//检查身份证号码

    var arrVerifyCode = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var Checker = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

    if (pId.length != 15 && pId.length != 18)    return false;

    var Ai = pId.length == 18 ? pId.substring(0, 17) : pId.slice(0, 6) + "19" + pId.slice(6, 16);

    if (!/^\d+$/.test(Ai))  return false;

    var yyyy = Ai.slice(6, 10), mm = Ai.slice(10, 12) - 1, dd = Ai.slice(12, 14);

    var d = new Date(yyyy, mm, dd), now = new Date();
    var year = d.getFullYear(), mon = d.getMonth(), day = d.getDate();

    if (year != yyyy || mon != mm || day != dd || d > now || year < 1940) return false;

    for (var i = 0, ret = 0; i < 17; i++)  ret += Ai.charAt(i) * Wi[i];
    Ai += arrVerifyCode[ret %= 11];

    return pId.length == 18 && pId != Ai ? false : true;
}

//验证email
function checkEmail(str){
    var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; 
    if (!re.test(str)) {
        return false;
    } else {
        return true;
    }
}


function isWeiXin(){ 
    var ua = window.navigator.userAgent.toLowerCase(); 
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
        return true; 
    }else{ 
        return false; 
    } 
}