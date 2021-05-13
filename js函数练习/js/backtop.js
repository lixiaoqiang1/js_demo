// JavaScript Document
//返回顶部按钮
window.onscroll = function(){
	var viewheight = window.screen.height;
	var scr = getScrollTop();
	var cro = document.getElementById('top-but');
	if(scr>viewheight){
		cro.style.display='block';
	}else if(scr<viewheight){
		cro.style.display='none';
	}
}
//返回顶部事件
function totop(){
	document.documentElement.scrollTop = document.body.scrollTop =0;	
}
//计算每月还款
function calculation (cl,i){
	removeClass('on');//移除已存在的class属性
	cl.className = cl.className + 'on';//点击增加class="on"
	var monthlyrepayment = document.getElementById('money-f').innerHTML;//每月还款
	var loanamount = document.getElementById('loanamount').innerHTML;//借款金额
	var totalrepayment = document.getElementById('totalrepayment').innerHTML;//还款总额
	var mon = document.getElementById('mon').value;//借多少
	var monthlyinterest = document.getElementById('monthlyinterest').value;//月利息
	if(mon<5 || mon>100){
		alert("单笔最低借款额度为5万，最高借款额度为100万");
	}else{
		//计算后的每月还款金额
		a = (mon*10000*monthlyinterest+(mon*10000)/i).toFixed(2);
		document.getElementById('money-f').innerHTML = a+'元';
		//计算后的借款金额
		b = mon*10000;
		document.getElementById('loanamount').innerHTML = '借款金额：'+b+'元';
		//计算后的还款总额
		c = mon*10000*monthlyinterest*i+mon*10000;
		document.getElementById('totalrepayment').innerHTML = '还款总额：'+c+'元';
	}
}
//获取第一步数据
function next(){
	var name = document.getElementById("truename").value;
	var mobile = document.getElementById("mobile").value;
	var sex = che("sex");
	var city = document.getElementById("city").value;
	if(name == "" || name == "您的真实姓名") {
		alert('请输入您的真实姓名');
		return false;
	}
	var han = /^[\u4e00-\u9fa5]+$/gi;
	var i = /\s/g;
	mobile = mobile.replace(i,'');
	
	if(!han.test(name)){
		alert("姓名请输入中文姓名！");
		return false;
	}
	if(name.length > 4){
		alert("请输入正确的姓名！");
		return false;
	}
	if(mobile == "" || mobile == "您的手机号码") {
		alert('请输入手机号码');
		return false;
	}
	
	var tel2 = /^1\d{10}$/;//^((13[0-9]{9})|(14[0-9]{9})|(15[0-9]{9})|(18[0-9]{9}))$/;
	if(!tel2.test(mobile))
	{
		alert("手机号码格式不正确");
		return;
	}
	
	if(sex == undefined){
		alert('请选择性别！');
		return false;
	}
	if(city == '' || city == '所在城市'){
		alert('请输入您所在的城市！');
		return false;
	}
	var first = document.getElementById("first");
	var second = document.getElementById("second");
	var third = document.getElementById("third");
	first.style.display='none';
	second.style.display='block';
	third.style.display='none';
}

/*
 * 获取第二步数据，并执行入库
 * 所有PC落地通用
 */
function suc(){
	//第一部数据
	var name = document.getElementById("truename").value;
	var mobile = document.getElementById("mobile").value;
	var sex = che("sex");
	var city = document.getElementById("city").value;
	//第二部数据
	var money = document.getElementById("money").value;
	var age = document.getElementById("age").value;
	var house = che("house");
	var car = che("car");
	var job = che("job");
	var source = $("#t").val();
	var ismove = 0;//是否移动端
	var num = /^[1-9]\d*$/;
	if(!num.test(money)){
		alert('请输入开头不为0的数字！');
		return false;
	}
	if(money<1){
		alert('金额必须大于1');
		return false;
	}
	if(age == '' || age == '填写您的年龄'){
		alert('请输入您的年龄！');
		return false;
	}
//	if(age<25){
//		alert('由于存在限制，目前贷款只支持25岁（含）以上的客户，还请谅解！');
//		return false;
//	}
	if(house == undefined){
		alert('请选择是否有房！');
		return false;
	}
	if(car == undefined){
		alert('请选择是否有车！');
		return false;
	}
	if(job == undefined){
		alert('请选择职业！');
		return false;
	}
	
	//开始执行后台
	$.post('/sem/loan_do.html',{'name':name,'mobile':mobile,'sex':sex,'city':city,'money':money,'age':age,'house':house,'car':car,'job':job,'source':source,'ismove':ismove},function (d){
		//alert(d);
		if(d == '2') {
			alert('验证码错误');
			return;
		}else if(d == '3'){
			alert('亲，24小时内只允许申请一次');
			return;
		}else if(d == '5'){
			alert('系统繁忙');
			return;
		}
		else {
			var first = document.getElementById("first");
			var second = document.getElementById("second");
			var third = document.getElementById("third");
			first.style.display='none';
			second.style.display='none';
			third.style.display='block';
			//alert('提交成功，贷款经理会在2小时内与您取得联系，请保持手机畅通');
			return;
		}
	});
	
	
}

/*
 * 获取第二步数据，并执行入库
 * 仅仅适用百度
 */
function suc2(){
	//第一部数据
	var name = document.getElementById("truename").value;
	var mobile = document.getElementById("mobile").value;
	var sex = che("sex");
	var city = document.getElementById("city").value;
	//第二部数据
	var money = document.getElementById("money").value;
	var age = document.getElementById("age").value;
	var house = che("house");
	var car = che("car");
	var job = che("job");
	var source = $("#t").val();
	var ismove = 0;//是否移动端
	var pid = document.getElementById("pid").value;
	var num = /^[1-9]\d*$/;
	if(!num.test(money)){
		alert('请输入开头不为0的数字！');
		return false;
	}
	if(age == '' || age == '填写您的年龄'){
		alert('请输入您的年龄！');
		return false;
	}
	if(house == undefined){
		alert('请选择是否有房！');
		return false;
	}
	if(car == undefined){
		alert('请选择是否有车！');
		return false;
	}
	if(job == undefined){
		alert('请选择职业！');
		return false;
	}
	
	//开始执行后台
	$.post('/sem/loan_do_baidu.html',{'name':name,'mobile':mobile,'sex':sex,'city':city,'money':money,'age':age,'house':house,'car':car,'job':job,'source':source,'ismove':ismove,'pid':pid},function (d){
		//alert(d);
		if(d == '2') {
			alert('系统繁忙，请稍后再试...');
			return;
		}else if(d == '3'){
			alert('亲，24小时内只允许申请一次');
			return;
		}else if(d == '5'){
			alert('系统繁忙');
			return;
		}
		else {
			var first = document.getElementById("first");
			var second = document.getElementById("second");
			var third = document.getElementById("third");
			first.style.display='none';
			second.style.display='none';
			third.style.display='block';
			//alert('提交成功，贷款经理会在2小时内与您取得联系，请保持手机畅通');
			return;
		}
	});
	
	
}

/*
 * 移动端贷款申请
 */
function semloan_wap(){
	//第一步
	var name = $('#name').val();
	var mobile = $('#mobile').val();
	var sex = $('#sex').val();
	var city = $('#profile_sublocation option:selected').text();
	//第二步
	var loanmoney = $('#loanmoney').val();
	var age = $('#age').val();
	var house = getRadioValue("house");
	var car = getRadioValue("car");
	var job = getRadioValue("job");
	var source = $('#t').val();
	var ismove = 1;//是否移动端
	
	var step1 = document.getElementById("step1");
	var step2 = document.getElementById("step2");
	var step3 = document.getElementById("step3");
	var num = /^[1-9]\d*$/;
	
	if(!num.test(loanmoney)){
		alert('请输入开头不为0的数字！');
		return false;
	}
//	if(loanmoney<5 || loanmoney>1000){
//		alert('由于存在限制，目前贷款只支持5万到1000万之间的金额，还请谅解！');
//		return false;
//	}
	
	if(age == "" || age == '您的真实年龄') {
		alert('请输入您的年龄');
		return;
	}
	if(!num.test(age)){
		alert('请输入数字类型的年龄！');
		return false;
	}
//	if(age<25){
//		alert('由于存在限制，目前贷款只支持25岁（含）以上的客户，还请谅解！');
//		return false;
//	}
	
	check_house = fn('house');
	if(check_house != 1) {
		alert('请选择房产情况');
		return;
	}
	
	check_car = fn('car');
	if(check_car != 1) {
		alert('请选择是否有车');
		return;
	}
	
	check_job = fn('job');
	if(check_job != 1) {
		alert('请选择职业状况');
		return;
	}
	//开始执行后台
	$.post('/sem/loan_do.html',{'name':name,'mobile':mobile,'sex':sex,'city':city,'money':loanmoney,'age':age,'house':house,'car':car,'job':job,'source':source,'ismove':ismove},function (d){
		if(d == '2') {
			alert('系统繁忙，请稍后再试...');
			return;
		}else if(d == '3'){
			alert('亲，24小时内只允许申请一次');
			return;
		}else if(d == '5'){
			alert('系统繁忙');
			return;
		}
		else {
			step1.style.display = "none";
			step2.style.display = "none";
			step3.style.display = "block";
			//alert('提交成功，贷款经理会在2小时内与您取得联系，请保持手机畅通');
			return;
		}
	});
	
}

/*
 * 移动端贷款申请
 */
function semloan_wap_baidu(){
	var weburl = window.location.href;//获取当前网址
	//第一步
	var name = $('#name').val();
	var mobile = $('#mobile').val();
	var sex = $('#sex').val();
	var city = $('#profile_sublocation option:selected').text();
	//var cityid = $('#cityid').val();
	//第二步
	var loanmoney = $('#loanmoney').val();
	var age = $('#age').val();
	var house = getRadioValue("house");
	var car = getRadioValue("car");
	var job = getRadioValue("job");
	var source = $('#t').val();
	var pid = $('#pid').val();
	var ismove = 1;//是否移动端
	
	var step1 = document.getElementById("step1");
	var step2 = document.getElementById("step2");
	var step3 = document.getElementById("step3");
	var num = /^[1-9]\d*$/;
	
	if(!num.test(loanmoney)){
		alert('请输入开头不为0的数字！');
		return false;
	}
//	if(loanmoney<5 || loanmoney>1000){
//		alert('由于存在限制，目前贷款只支持5万到1000万之间的金额，还请谅解！');
//		return false;
//	}
	
	if(age == "" || age == '您的真实年龄') {
		alert('请输入您的年龄');
		return;
	}
	if(!num.test(age)){
		alert('请输入数字类型的年龄！');
		return false;
	}
//	if(age<25){
//		alert('由于存在限制，目前贷款只支持25岁（含）以上的客户，还请谅解！');
//		return false;
//	}
	
	check_house = fn('house');
	if(check_house != 1) {
		alert('请选择房产情况');
		return;
	}
	
	check_car = fn('car');
	if(check_car != 1) {
		alert('请选择是否有车');
		return;
	}
	
	check_job = fn('job');
	if(check_job != 1) {
		alert('请选择职业状况');
		return;
	}
	//开始执行后台
	$.post('/sem/loan_do_baidu.html',{'name':name,'mobile':mobile,'sex':sex,'city':city,'money':loanmoney,'age':age,'house':house,'car':car,'job':job,'source':source,'ismove':ismove,'pid':pid,'weburl':weburl},function (d){
		if(d == '2') {
			alert('系统繁忙，请稍后再试...');
			return;
		}else if(d == '3'){
			alert('亲，24小时内只允许申请一次');
			return;
		}else if(d == '5'){
			alert('系统繁忙');
			return;
		}
		else {
			step1.style.display = "none";
			step2.style.display = "none";
			step3.style.display = "block";
			//alert('提交成功，贷款经理会在2小时内与您取得联系，请保持手机畅通');
			return;
		}
	});
	
}


//获取单选框的value值
function che(name){
	var obj = document.getElementsByName(name);
    for(var i=0; i<obj.length; i ++){
        if(obj[i].checked){
            return obj[i].value;
        }
    }
}
//获取滚动条到顶部的距离
function getScrollTop(){     
    var scrollTop=0;     
    if(document.documentElement&&document.documentElement.scrollTop){     
        scrollTop=document.documentElement.scrollTop;     
    }else if(document.body){     
        scrollTop=document.body.scrollTop;     
    }     
    return scrollTop;     
}
//移除class
function removeClass(claname){
	var tags=document.getElementsByTagName("*");
	for(var i in tags){//对标签进行遍历
		if(tags[i].nodeType==1){//判断节点类型 
			if(tags[i].getAttribute("class") == claname){//判断和需要CLASS名字相同
				tags[i].className = '';
			} 
		} 
	}
}

//--获取radio值-- 
function getRadioValue(radioName) {
    var chkRadio = document.getElementsByName(radioName);
    for (var i = 0; i < chkRadio.length; i++) {
        if (chkRadio[i].checked)
            return chkRadio[i].value;
    }
}