// JavaScript Document

//电话号码base64加密
function tests(mobile){
	var b = new Base64();
	var mobile = b.encode(mobile);
	return mobile;
}


function firstloan(){
	var weburl = window.location.href;//获取当前网址
	var ismove = 1;//是否移动端
	var source = $('#t').val();
	var third_uid = $('#u').val();//第三方UID，比如贷贷猪，助贷宝等
	var mid = $('#mid').val();
	var id = $('#id').val();
	var sex = $('#sex').val();
	var type = $('#type').val();
	var page = $('#page').val();

	var truename = $("#truename").val();
	var mobile = $("#mobile").val();
	var loan_money = $("#loan_money").val();
	var city = $("#profile_sublocation").find("option:selected").text();
	//var code = $("#code").val();
	
	var han = /^[\u4e00-\u9fa5]+$/gi;
	//var reg2 = /^((13[0-9]{9})|(14[0-9]{9})|(15[0-9]{9})|(18[0-9]{9}))$/;
	var reg2 = /^1\d{10}$/;
	var num = /([1-9]\d*(\.\d*[1-9])?)/;
	if(truename ==''){
		alert("姓名不能为空！");
		return;
	}else if(!han.test(truename)){
		alert("请输入中文姓名！");
		return;
	}else if(name.length > 4){
		alert("请输入正确的姓名！");
		return;
	}else if(mobile == ''){
		alert('手机号码不能为空！');
		return;
	}else if(!reg2.test(mobile)){
		alert("手机号码格式不正确！");
	    return;
	}else if(city=='请选择市'){
		alert("请选择您所在的城市！");
	    return;
	}

	mobile = tests(mobile);
	/*************用户协议**********/
	var agereement = $("#agereement").val();
	if(agereement == 0){
		alert('同意助贷网为您推荐贷款机构为您服务');
		return false;
	}
	/*************用户协议**********/
	$('.ljpd1').hide();
	$('.ljpd2').show();
	$.post('/sem/new_loan_qdai_do.html',{
		'name':truename,
		'mobile':mobile,
		'loan_money':loan_money,
		'city':city,
		'source':source,
		'weburl':weburl,
		'ismove':ismove,
		'mid':mid,
		'sex':sex,
		'third_uid':third_uid
	},function (d){
		if(d == '2') {
			alert('系统繁忙，请稍后再试...');
			$('.ljpd1').show();
			$('.ljpd2').hide();
			return;
		}else if(d == '3'){
			alert('亲，24小时内只允许申请一次');
			$('.ljpd1').show();
			$('.ljpd2').hide();
			return;
		}else if(d == '5'){
			alert('系统繁忙，请稍后再试...');
			$('.ljpd1').show();
			$('.ljpd2').hide();
			return;
		}else if(d == '6'){
			alert('与黑名单匹配的IP，申请后弹出提示框：无法提交贷款申请，如有贷款需求或其它疑问，请直接拨打免费热线：400-77777-11，感谢配合！');
			$('.ljpd1').show();
			$('.ljpd2').hide();
			return;
		}else {
			$("#apply-loan-first").hide();
			$("#apply-loan-second").show();
			$('#id').val(d);
			conversion();//调用转化代码
			location.href = '/sem/seconddetails.html?type='+type+'&id='+d+'&t='+source+'&page='+page;
			return;
		}
	});
}

function secondloan(){
	var num = /([1-9]\d*(\.\d*[1-9])?)/;
	var id = $('#id').val();
	var age = $('#age').val();

	var source = $('#t').val();
	//第二步内容
	var house = $("#house").val();
	var car = $("#car").val();
	var jobtype = $("#jobtype").val();
	var baodan_is = $("#baodan_is").val();

	if(baodan_is == '有'){
		var baodan_year_money = $("#baodan_year_money").val();
	}

	if(age == ''){
		alert('请填写年龄');
		return;
	}
	if(house == '0'){
		alert('请选择是否有房');
		return;
	}
	if(car == '0'){
		alert('请选择是否有车');
		return;
	}
	if(jobtype == '0'){
		alert('请选择职业');
		return;
	}
	if(baodan_is == '0'){
		alert('请选择是否有保单');
		return;
	}

	$.post('/sem/wap_update_loan_qdai.html',{
		'age':age,
		'source':source,
		'house':house,
		'car':car,
		'jobtype':jobtype,
		'baodan_is':baodan_is,
		'baodan_year_money':baodan_year_money,
		'id':id
	},function (d){
		window.location.href = '/sem/success_loan.html?type=qdai_and_zdw';
	});
}

/**
 * 发送验证码
 * @returns {Boolean}
 */
function sendcode()
{
	var mobile = $('#mobile').val();
	var randcode = $('#randcode').val();
	if(mobile == "") {
		alert('请输入手机号码');
		return;
	}
	var tel2 = /^((13[0-9]{9})|(14[0-9]{9})|(15[0-9]{9})|(18[0-9]{9}))$/;
	if(!tel2.test(mobile))
	{
		alert("手机号码格式不正确");
		return;
	}
	if(randcode == "") {
		alert('请输入图形验证码');
		return;
	}
	document.getElementById("getcode").value="发送中...";
	$.post('/sendsms/sms_code.html',{'mobile':mobile,'randcode':randcode,'type':'移动端落地页'},function (dt){
		if(dt == 1) {
			countdown();
			loan_apply();
			//document.getElementById("getcode").value="验证码已发送";
			return;
		}else if(dt == 7){
			document.getElementById("getcode").value="获取验证码";
			alert('亲，验证码3分钟内有效，有效期不允许重复发送');
			return;
		}else if(dt == 8){
			document.getElementById("getcode").value="获取验证码";
			alert("图形验证码不正确");
			get_randcode();
			return;
		}else{
			document.getElementById("getcode").value="获取验证码";
			alert("验证码发送失败");
			get_randcode();
			loan_apply();
			return;
		}
	});
}

//倒计时
function countdown(){
	var i = 180;
		//“获取验证码”按钮内容
		def_html = "重新发送";

	function auto(){
		if(i){
			$("#getcode").attr("disabled", true);
			document.getElementById("getcode").value='('+i+')';
			i--;
			//倒计时
			setTimeout(function(){auto();},1e3);
		}else{
			//倒计时结束，重置按钮内容
			$("#getcode").attr("disabled", false);
			document.getElementById("getcode").value = def_html;
		}			
	}
	auto();
}

function get_randcode(){
	$('#rand_code').attr('src', '/captchacode/verify_image2.html?r=' + Math.random());
}

function loan_apply(){
	var weburl = window.location.href;//获取当前网址
	var ismove = 1;//是否移动端
	var source = $('#t').val();
	var third_uid = $('#u').val();//第三方UID，比如贷贷猪，助贷宝等
	var mid = $('#mid').val();
	var yzm = 'vip验证码';
	
	var truename = $("#truename").val();
	var mobile = $("#mobile").val();
	var city = $("#profile_sublocation").find("option:selected").text();
	if(truename == ''){
		truename = '未知';
	}
	
	$.post('/sem/loan_do.html',{
		'name':truename,
		'mobile':mobile,
		'city':city,
		'source':source,
		'weburl':weburl,
		'ismove':ismove,
		'mid':mid,
		'third_uid':third_uid,
		'yzm':yzm
	},function (d){
		if(d == '2') {
		}else if(d == '3'){
		}else if(d == '5'){
		}else if(d == '6'){
		}else {
			$('#id').val(d);
		}
	});			
}