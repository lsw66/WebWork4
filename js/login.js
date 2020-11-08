$(document).ready(function(){
//	function changeCode() {
//		var codeImg=document.getElementById("verifyCode");
//		codeImg.src="/work3/servlet/CreateVerifyImageController.do?t="+Math.random();
//	}
//	function jqAjaxCheckLogin() {
//		var data={username: $("#username").val() ,password: $("#password").val()};
//		if($("#button").prop("checked")){
//			data.autoLogin="y";
//		}
//		$.ajax({
//			type:"post",
//			url:"/work3/servlet/AjaxLoginCheck.do",
//			data:data,
//			dataType:"json",
//			success:function(response){
//				if(response.code == 0){
//					window.location.href="main.jsp";
//				}
//				else{
//					$("#checkError").text("response.info");
//				}
//				
//			}
//		
//		})
//		
//	}

	
	$("#username").blur(function(){
		if($("#username").val() == "")
		{
			$("#t_username").addClass("error");
		}
		else{
			$("#t_username").removeClass("error");
		}
	});
	$("#password").blur(function(){
		if($("#password").val()==""){
			$("#t_password").addClass("error");
		}
		else{
			$("#t_password").removeClass("error");
		}
	});
	$("#vcode").blur(function(){
		if($("#vcode").val()==""){
			$("#t_vcode").addClass("error");
		}
		else{
			$("#t_vcode").removeClass("error");
		}
	});
	
	$("#verifyCode").click(function(){
		var codeImg=document.getElementById("verifyCode");
		codeImg.src="/work3/servlet/CreateVerifyImageController.do?t="+Math.random();
	})
	$("#clickbutton").click(function(){
		var username=$("#username").val();
		var password=$("#password").val();
		var vcode=$("#vcode").val();
		console.log(username);
		console.log(password);
		console.log(vcode);
		var data={username: $("#username").val() ,password: $("#password").val(),vcode:$("#vcode").val()};
		
		if($("#selectbutton").prop("checked")){
			data.autoLogin="y";
		}
		$.ajax({
			type:"post",
			url:"servlet/AjaxLoginCheck.do",
			data:data,
			dataType:"json",
			success:function(response){
				if(response.code == 0){
					window.location.href="main.jsp";
				}
				else{
					$("#checkError").text(response.info);
				}
			}
		})
	})

})


