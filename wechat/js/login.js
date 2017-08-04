// 获取sid
getSid();
// 登录
$('#login-btn').on('click',function(){
    var mobile = $('#login-account').val().trim();
    var password = $('#login-pwd').val().trim();
    if(mobile == ''){
        layer.msg('请输入注册手机号',{time:1500});
        return false;
    }else if(!validatePhoneNumber(mobile)){
        layer.msg('手机号格式错误',{time:1500});
        return false;
    }else if(password == ''){
        layer.msg('请输入登录密码',{time:1500});
        return false;
    }else if(!validatePassword(password)){
        layer.msg('请输入6-20位数字字母',{time:1500});
        return false;
    }
    ajax_jquery({
        url: mainUrl + '/api/user/login',
        data: {
            'mobile': mobile,
            'password': password
        },
        success: function (resp) {
            if(resp.code == 1){
                layer.msg(resp.msg);
                setTimeout('window.location.href = "index.html";',2000);
            }else if(resp.msg != ''){
                layer.msg(resp.msg);
                return false;
            }else{
                layer.msg('登录失败，请重试');
                return false;
            }
        }
    });
})

 //短信验证码
function sendSmsVerify(id,type) {
    var mobile = $.trim($('#'+ id).val());

    if(mobile == ''){
        layer.msg('请输入注册手机号',{time:1500});
        return false;
    }else if(!validatePhoneNumber(mobile)){
        layer.msg('手机号格式错误',{time:1500});
        return false;
    }else if(countdown != 60){
        return false;
    }
    ajax_jquery({
        url: mainUrl + '/api/user/sendSmsVerify',
        data: {
            'mobile': mobile,
            'type': type
        },
        success: function (resp) {
            if (resp.code == "1") {
                settime();
            } else if(resp.msg != ''){
                layer.msg(resp.msg);
                return false;
            }else{
                layer.msg('获取失败，请重试');
                return false;
            }
        }
    });
}

var countdown = 60;
function settime() {
    if (countdown == 0) {
        $("#getSmsVerify").html("获取验证码");
        countdown = 60;
        return;
    } else {
        $("#getSmsVerify").html(countdown + "s后重新获取");
        countdown--;
    }
    setTimeout(function () {
        settime();
    }, 1000);
}

//注册协议
$('#protocol').on('click',function(){
    var data = $(this).attr('data');
    if(data == '1'){
        $(this).attr({'data':'0','src':'../img/icon_unchecked.png'});
    }else{
        $(this).attr({'data':'1','src':'../img/icon_checked.png'});
    }
})

// 注册
$('#reg-btn').on('click',function(){
    var mobile = $('#reg-account').val().trim();
    var smsverify = $('#reg-verify').val().trim();
    var password = $('#reg-pwd').val().trim();
    var invitemobile = $('#reg-inviter').val().trim();
    var protocol = $('#protocol').attr('data');
    if(mobile == ''){
        layer.msg('请输入注册手机号',{time:1500});
        return false;
    }else if(!validatePhoneNumber(mobile)){
        layer.msg('手机号格式错误',{time:1500});
        return false;
    }else if(smsverify == ''){
        layer.msg('请输入短信验证码',{time:1500});
        return false;
    }else if(password == ''){
        layer.msg('请输入密码',{time:1500});
        return false;
    }else if(!validatePassword(password)){
        layer.msg('请输入6-20位数字字母',{time:1500});
        return false;
    }else if(protocol != '1'){
        layer.msg('请阅读同意服务协议',{time:1500});
        return false;
    }
    ajax_jquery({
        url: mainUrl + '/api/user/reg',
        data: {
            'mobile': mobile,
            'password': password,
            'repassword': password,
            'smsverify': smsverify,
            'type': 0,
            'invitemobile': invitemobile,
            'channel':'wechat'
        },
        success: function (resp) {
            if(resp.code == 1){
                layer.msg(resp.msg);
                setTimeout('window.location.href = "login.html";',2000);
            }else if(resp.msg != ''){
                layer.msg(resp.msg);
                return false;
            }else{
                layer.msg('注册失败，请重试');
                return false;
            }
        }
    });
})

// 找回密码
$('#find-btn').on('click',function(){
    var mobile = $('#find-account').val().trim();
    var smsverify = $('#find-verify').val().trim();
    var newPassword = $('#find-pwd').val().trim();
    if(mobile == ''){
        layer.msg('请输入注册手机号',{time:1500});
        return false;
    }else if(!validatePhoneNumber(mobile)){
        layer.msg('手机号格式错误',{time:1500});
        return false;
    }else if(smsverify == ''){
        layer.msg('请输入短信验证码',{time:1500});
        return false;
    }else if(newPassword == ''){
        layer.msg('请输入新密码',{time:1500});
        return false;
    }else if(!validatePassword(newPassword)){
        layer.msg('请输入6-20位数字字母',{time:1500});
        return false;
    }
    ajax_jquery({
        url: mainUrl + '/api/user/resetPassword',
        data: {
            'mobile': mobile,
            'smsverify': smsverify,
            'newPassword': newPassword
        },
        success: function (resp) {
            if(resp.code == 1){
                layer.msg(resp.msg);
                setTimeout('window.location.href = "login.html";',2000);
            }else if(resp.msg != ''){
                layer.msg(resp.msg);
                return false;
            }else{
                layer.msg('登录失败，请重试');
                return false;
            }
        }
    });
})