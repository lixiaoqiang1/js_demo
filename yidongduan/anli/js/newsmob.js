function infoAlert(content) {
    //mui.toast(content, function() {});
    alert(content);
}

function tests(mobile) {
    var b = new Base64();
    var mobile = b.encode(mobile);
    return mobile;
}

// JavaScript Document
function firstloan() {
    /*************用户协议**********/
    var agereement_wap = $("#agereement_wap").val();
    if (agereement_wap == 0) {
        infoAlert('请勾选《服务协议》');
        return false;
    }
    /*************用户协议**********/
    var weburl = window.location.href; //获取当前网址
    var name = $('#name').val(); //姓名
    var mobile = $('#mobile').val(); //手机号码
    var sex = $('#sex').val(); //性别
    var loanmoney = $('#loanmoney').val(); //贷款金额
    var ismove = 0; //是否移动端
    var source = $('#t').val(); //来源-模板code
    var third_uid = $('#u').val(); //第三方UID，比如贷贷猪，助贷宝等
    var mid = $('#mid').val(); //推广经理ID
    var city = $('#profile_sublocation option:selected').text(); //城市

    var han = /^[\u4e00-\u9fa5]+$/gi;
    var reg2 = /^1\d{10}$/;
    var num = /([1-9]\d*(\.\d*[1-9])?)/;
    if (name == '') { infoAlert("姓名不能为空"); return; }
    if (!han.test(name)) { infoAlert("请输入中文姓名！"); return; }
    if (name.length > 4) { infoAlert("请输入正确的姓名！"); return; }
    if (sex == '') { infoAlert("请选择性别"); return; }
    if (!reg2.test(mobile)) { infoAlert("手机号码格式不正确"); return; }
    if (!num.test(loanmoney)) { infoAlert('请输入开头不为0的数字！'); return; }
    if (loanmoney < 1) { infoAlert('金额必须大于1'); return; }
    if (city == '请选择市') { infoAlert("请选择您所在的城市"); return; }

    mobile = tests(mobile);

    $('.ljpd1').hide();
    $('.ljpd2').show();
    var json_data = {
        'name': name,
        'mobile': mobile,
        'sex': sex,
        'city': city,
        'money': loanmoney,
        'source': source,
        'weburl': weburl,
        'ismove': ismove,
        'mid': mid,
        'third_uid': third_uid,
        'isdecode': 1
    };
    $.ajax({
        type: 'GET', //这里用GET
        url: jiekou_site_url + '/sem/new_loan_do02.html',
        dataType: 'jsonp', //类型
        data: json_data,
        jsonp: 'jcallback', //jsonp回调参数，必需
        async: false,
        success: function(d) { //返回的json数据
            if (d == '2') {
                infoAlert('系统繁忙，请稍后再试...');
                $('.ljpd1').show();
                $('.ljpd2').hide();
                return;
            } else if (d == '3') {
                infoAlert('亲，24小时内只允许申请一次');
                $('.ljpd1').show();
                $('.ljpd2').hide();
                return;
            } else if (d == '5') {
                infoAlert('系统繁忙，请稍后再试...');
                $('.ljpd1').show();
                $('.ljpd2').hide();
                return;
            } else if (d == '6') {
                infoAlert('无法提交贷款申请，如有贷款需求或其它疑问，请直接拨打免费热线：，感谢配合！');
                $('.ljpd1').show();
                $('.ljpd2').hide();
                return;
            } else if (d == '7') {
                infoAlert('无法提交贷款申请，如有贷款需求或其它疑问，请直接拨打免费热线：，感谢配合！');
                $('.ljpd1').show();
                $('.ljpd2').hide();
                return;
            } else {
                $('.tab_menu .menu2').addClass('on').siblings().removeClass('on');
                $('.tab-item').hide();
                $('#tabitem2').show();
                $('#id').val(d);
                if (typeof(conversion) == "function") {
                    conversion();
                }
                 requestWcApi(d); //微信
                return;
            }
        },
        timeout: 3000
    });
}

function secondloan() {
    var weburl = window.location.href; //获取当前网址
    var id = $('#id').val();

    //第二步内容
    var birthday = $('#birthday').val(); //1.选择生日
    var house = $("#house").val(); //2.是否有房
    var car = $("#car").val(); //3.是否有车
    var gongjijin = $("#gongjijin").val(); //4.是否有公积金
    var baodan_is = $("#baodan_is").val(); //5.是否有保单
    var credit_card = $("#credit_card").val(); //6.是否有信用卡
    var work_shebao = $("#work_shebao").val(); //7.是否有社保
    var work_wage_give_type = $("#work_wage_give_type").val(); //8.是否银行代发工资
    var weili = $("#weili").val(); //9.是否有微粒贷
    var zhima = $("#zhima").val(); //10.芝麻信用分
    var is_gx = $('#gou_l').val(); //是否勾选

    if (birthday == '') { infoAlert("请填定出生日期"); return; }
    if (house == '请选择') { infoAlert("请选择是否有房"); return; }
    if (car == '请选择') { infoAlert("请选择是否有车"); return; }
    if (gongjijin == '请选择') { infoAlert("请选择是否有公积金"); return; }
    if (baodan_is == '请选择') { infoAlert("请选择是否有保单"); return; }
    if (credit_card == '请选择') { infoAlert("请选择是否有信用卡"); return; }
    if (work_shebao == '请选择') { infoAlert("请选择是否有社保"); return; }
    if (work_wage_give_type == '请选择') { infoAlert("请选择是否工资代发"); return; }
    if (weili == '请选择') { weili = 0; }
    if (zhima == '请选择') { zhima = 0; }

    var json_data = {
        'id': id,
        'is_gx': is_gx,
        'house': house,
        'car': car,
        'baodan_is': baodan_is,
        'birthday': birthday,
        'gongjijin': gongjijin,
        'creditcard_situation': credit_card,
        'shebao': work_shebao,
        'work_wage_give_type': work_wage_give_type,
        'weili': weili,
        'zhima': zhima
    };
    //wap_update_loan_Insurance02
    $.ajax({
        type: 'GET', //这里用GET
        url: jiekou_site_url + '/sem/wap_update_loan_Insurance02.html',
        dataType: 'jsonp', //类型
        data: json_data,
        jsonp: 'jcallback', //jsonp回调参数，必需
        async: false,
        success: function(d) { //返回的json数据
            if (d == '2') {
                infoAlert('系统繁忙，请稍后再试...');
                return;
            } else if (d == '3') {
                infoAlert('亲，24小时内只允许申请一次');
                return;
            } else if (d == '5') {
                infoAlert('系统繁忙');
                return;
            } else if (d == '6') {
                infoAlert('无法提交贷款申请，如有贷款需求或其它疑问，请直接拨打免费热线：，感谢配合！');
                return;
            } else if (d == '7') {
                infoAlert('无法提交贷款申请，如有贷款需求或其它疑问，请直接拨打免费热线：，感谢配合！');
                return;
            } else if (d == '8') {
                infoAlert('请填定出生日期');
                return;
            } else {
                var successTmpl = 'sem57'; //成功后的模板
                var url = 'successTmpl=' + successTmpl;
                if (template) {
                    url += '&template=' + template;
                }
                if (template == 'sem103' || template == 'sem100') {
                    try {
                        gdt('track', 'REGISTER', { 'key1': 'value1', 'key2': 'value2' });
                    } catch (e) {
                        console.log(e.message)
                    }
                }
                //location.href = jiekou_site_url + "/sem/sem_success_wap.html?" + url;
                $('.btn_sq .well').hide();
                $('.tab_menu .menu3').addClass('on').siblings().removeClass('on');
                $('.tab-item').hide();
                $('#tabitem3').show();
            }
        },
        timeout: 3000
    });
}

/**
 * 发送验证码
 * @returns {Boolean}
 */
function sendcode() {
    var mobile = $('#mobile').val();
    var randcode = $('#randcode').val();
    if (mobile == "") {
        infoAlert('请输入手机号码');
        return;
    }
    var tel2 = /^((13[0-9]{9})|(14[0-9]{9})|(15[0-9]{9})|(18[0-9]{9}))$/;
    if (!tel2.test(mobile)) {
        infoAlert("手机号码格式不正确");
        return;
    }
    if (randcode == "") {
        infoAlert('请输入图形验证码');
        return;
    }
    document.getElementById("getcode").value = "发送中...";
    var json_data = { 'mobile': mobile, 'randcode': randcode, 'type': '移动端落地页' };
    $.ajax({
        type: 'GET', //这里用GET
        url: jiekou_site_url + '/sendsms/sms_code.html',
        dataType: 'jsonp', //类型
        data: json_data,
        jsonp: 'jcallback', //jsonp回调参数，必需
        async: false,
        success: function(dt) { //返回的json数据
            if (dt == 1) {
                countdown();
                loan_apply();
                return;
            } else if (dt == 7) {
                document.getElementById("getcode").value = "获取验证码";
                infoAlert('亲，验证码3分钟内有效，有效期不允许重复发送');
                return;
            } else if (dt == 8) {
                document.getElementById("getcode").value = "获取验证码";
                infoAlert("图形验证码不正确");
                get_randcode();
                return;
            } else {
                document.getElementById("getcode").value = "获取验证码";
                infoAlert("验证码发送失败");
                get_randcode();
                loan_apply();
                return;
            }
        },
        timeout: 3000
    });
}

//倒计时
function countdown() {
    var i = 180;
    //“获取验证码”按钮内容
    def_html = "重新发送";

    function auto() {
        if (i) {
            $("#getcode").attr("disabled", true);
            document.getElementById("getcode").value = '(' + i + ')';
            i--;
            //倒计时
            setTimeout(function() { auto(); }, 1e3);
        } else {
            //倒计时结束，重置按钮内容
            $("#getcode").attr("disabled", false);
            document.getElementById("getcode").value = def_html;
        }
    }
    auto();
}

function get_randcode() {
    $('#rand_code').attr('src', jiekou_site_url + '/captchacode/verify_image2.html?r=' + Math.random());
}

function loan_apply() {
    var weburl = window.location.href; //获取当前网址
    var ismove = 1; //是否移动端
    var source = $('#t').val();
    var third_uid = $('#u').val(); //第三方UID，比如贷贷猪，助贷宝等
    var mid = $('#mid').val();
    var yzm = 'vip验证码';

    var truename = $("#truename").val();
    var mobile = $("#mobile").val();
    var city = $("#profile_sublocation").find("option:selected").text();
    if (truename == '') {
        truename = '未知';
    }
    var json_data = {
        'name': truename,
        'mobile': mobile,
        'city': city,
        'source': source,
        'weburl': weburl,
        'ismove': ismove,
        'mid': mid,
        'third_uid': third_uid,
        'yzm': yzm
    };
    $.ajax({
        type: 'GET', //这里用GET
        url: jiekou_site_url + '/sem/loan_do.html',
        dataType: 'jsonp', //类型
        data: json_data,
        jsonp: 'jcallback', //jsonp回调参数，必需
        async: false,
        success: function(d) { //返回的json数据
            if (d == '2') {} else if (d == '3') {} else if (d == '5') {} else if (d == '6') {} else {
                $('#id').val(d);
            }
        },
        timeout: 3000
    });
}