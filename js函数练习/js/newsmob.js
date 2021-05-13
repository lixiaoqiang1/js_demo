// JavaScript Document
function chesex(obj,k){
	var i = 1;
	for(i;i<3;i++){
		var j = document.getElementById("sex"+i);
		j.style.backgroundPosition="0 1.2rem";
	}
	obj.style.backgroundPosition="0 -1.4rem";
	var sex = document.getElementById("sex");
	sex.value = k;
}

//电话号码base64加密
function tests(mobile){
	var b = new Base64();
	var mobile = b.encode(mobile);
	return mobile;
}


function complete(){
	var weburl = window.location.href;//获取当前网址
	
	var name = $('#name').val();
	var mobile = $('#mobile').val();
	var sex = $('#sex').val();
	var age = $('#age').val();
	var loanmoney = $('#loanmoney').val();
	var ismove = 1;//是否移动端
	var source = $('#t').val();
	var third_uid = $('#u').val();//第三方UID，比如贷贷猪，助贷宝等
	var mid = $('#mid').val();
	var city = $('#profile_sublocation option:selected').text();
	
	var han = /^[\u4e00-\u9fa5]+$/gi;
	var reg2 = /^(1[0-9]{10})$/;
	var num = /([1-9]\d*(\.\d*[1-9])?)/;
	if(name ==''){
		alert("姓名不能为空");
		return;
	}
	if(!han.test(name)){
		alert("请输入中文姓名！");
		return;
	}
	if(name.length > 4){
		alert("请输入正确的姓名！");
		return;
	}
	if(sex==''){
		alert("请选择性别");
	    return;
	}
	if(!reg2.test(mobile)){
		alert("手机号码格式不正确");
	    return;
	}
	if(age==''){
		alert("请输入年龄");
	    return;
	}
	if(age<1){
		alert("请填写正确的年龄");
	    return;
	}
	if(!num.test(loanmoney)){
		alert('请输入开头不为0的数字！');
		return;
	}
	if(loanmoney<1){
		alert('金额必须大于1');
		return;
    }
	if(city=='请选择市'){
		alert("请选择您所在的城市");
	    return;
	}
	var mobile = tests(mobile);
	$.post('/zdhsem/loan_do.html',{'name':name,'mobile':mobile,'sex':sex,'city':city,'money':loanmoney,'age':age,'source':source,'weburl':weburl,'ismove':ismove,'mid':mid,'third_uid':third_uid,'isdecode':1},function (d){
		if(d == '2') {
			alert('系统繁忙，请稍后再试...');
			return;
		}else if(d == '3'){
			alert('亲，24小时内只允许申请一次');
			return;
		}else if(d == '5'){
			alert('系统繁忙');
			return;
		}else if(d == '6'){
			alert('与黑名单匹配的IP，申请后弹出提示框：无法提交贷款申请，如有贷款需求或其它疑问，请直接拨打免费热线：400-77777-11，感谢配合！');
			return;
		}else if(d == '7'){
			alert('无法提交贷款申请，如有贷款需求或其它疑问，请直接拨打免费热线：400-77777-11，感谢配合！');
			return;
		}else {
			location.href = "/zdhsem/sem_success_wap.html";
//			var thebeg = document.getElementById("thebeg");
//			var theend = document.getElementById("theend");
//			thebeg.style.display = "none";
//			theend.style.display = "block";
			var hezuofang = document.getElementById("hezuofang");

			//alert('提交成功，贷款经理会在2小时内与您取得联系，请保持手机畅通');
			return;
		}
	});
}