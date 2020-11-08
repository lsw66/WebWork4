$(document).ready(function(){
    var usernameIsOK;
    var chrnameIsOK;
    var emailIsOK;
    var provinceIsOK;
    var cityIsOK;
    var passwordIsOK;
    var rpasswordIsOK;

    var chr=/^[a-zA-Z]{1}([a-zA-Z0-9]){3,14}$/;
    var chr2=/^[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+\.com$/;
    var chr3=/^[\u4e00-\u9fa5]{2,4}$/;
    var chr4=/^.{4,15}$/;

    var confirm;

    $("#username").blur(function(){
		if($("#username").val() == "")
		{
            $("#t_username").text("用户名不能为空")
			$("#t_username").addClass("error");
        }
        else if(!chr.exec($(this).val())){
            $("#t_username").text("必须以字母开头，只能使用数字和字母，长度为4-15");
			$("#t_username").addClass("error");
        }
		else{
           var username=$("#username").val();
            $.ajax({
                type:"post",
                url:"servlet/AjaxRegisterUsernameCheck.do",
                data:{username:username},
                dataType:"json",
                success:function(response){
                    if(response.code == 1){
                        $("#t_username").removeClass("error");3
                        usernameIsOK=true;
                    }
                    else{
                        $("#t_username").text("用户名已存在");
			            $("#t_username").addClass("error");
                    }
                }
            })
        }
    });
    $("#chrname").blur(function(){
        if($(this).val()==""){
            $("#t_chrname").text("真实姓名不能为空");
            $("#t_chrname").addClass("error");
        }
        else if(!chr3.exec($(this).val())){
            $("#t_chrname").text("真实姓名只能是2-4长度的中文");
            $("#t_chrname").addClass("error");
        }
        else{
            $("#t_chrname").removeClass("error");
            chrnameIsOK=true;
        }
    });

    $("#email").blur(function(){
        if($(this).val() ==""){
            $("#t_email").text("邮箱不能为空");
            $("#t_email").addClass("error");
        }
        else if(!chr2.exec($(this).val())){
            $("#t_email").text("邮箱格式不正确");
            $("#t_email").addClass("error");
        }
        else{
            var email=$("#email").val();
            $.ajax({
                type:"post",
                url:"servlet/AjaxRegisterEmailCheck.do",
                data:{email:email},
                dataType:"json",
                success:function(response){
                    if(response.code == 1){
                        $("#t_email").removeClass("error");
                        emailIsOK=true;
                    }
                    else{
                        $("#t_email").text("邮箱已被占用");
			            $("#t_email").addClass("error");
                    }
                }
            })
          
        }
    });

    $("#password").blur(function(){
        if($(this).val() ==""){
            $("#t_password").text("密码不能为空");
            $("#t_password").addClass("error");
        }
        else if(!chr4.exec($(this).val())){
            $("#t_password").text("密码最小长度为4");
            $("#t_password").addClass("error");
        }
        else{
            $("#t_password").removeClass("error");
            passwordIsOK=true;
        }
    });

    $("#rpassword").blur(function(){
        var password=$("#password").val();
        var rpassword=$("#rpassword").val();
        console.log(password);
        console.log(rpassword);
        if($(this).val()==""){
            $("#t_rpassword").text("确认密码不能为空");
            $("#t_rpassword").addClass("error");
        }
        else if(password != rpassword){
            $("#t_rpassword").text("两次输入的密码不一样");
            $("#t_rpassword").addClass("error");
        }
        else{
            $("#t_rpassword").removeClass("error");
            rpasswordIsOK=true;
        }
    });

    fillProvince();
    $("#province").change(function(){
        $("#city").empty();
        $("city").append($("<option>").val("").text("请选择城市"));
        if($(this).val()==""){
            $("#t_province").text("必须选择省份");
            $("#t_province").addClass("error");
            return;
        }
        confirm=$(this).val();
        provinceIsOK=true;
        $("#t_province").removeClass("error");
        var provinceCode=$("#province").val();
        // console.log(provinceCode);
        $.ajax({
            type:"post",
            url:"servlet/queryProvinceCity.do",
            data:{provinceCode:provinceCode},
            dataType:"json",
            success:function(response){
                // console.log(response);
                // console.log(response[0].cityId);
                // console.log(response[0].city);
                var index;
                for(index=0;index<response.length;index++){
                  
                    var option=$("<option>").val(response[index].cityId).text(response[index].city);
                    $("#city").append(option);
                }
            }
        })
    });

    $("#city").change(function(){
        if($("#city").val==0){
            $("#t_city").text("必须选择城市");
            $("#t_city").addClass("error");
            return;
        }
        cityIsOK =true;
    })

    $("#clickbutton").click(function () {
        var username = $("#username").val();
        var chrname = $("#chrname").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var province=confirm;
        var city=$("#city").val();
        console.log(username+chrname+email+password+province+city);
        if(usernameIsOK && chrnameIsOK && emailIsOK && provinceIsOK && passwordIsOK && rpasswordIsOK){
            $.ajax({
                type:"post",
                url:"servlet/AjaxRegisterUser.do",
                data:"username="+username+"&chrname="+chrname+"&email="+email+"&password="+password+"&province"+province+"&city"+city,
                success:function () {
                	$("#clickbuttonerror").text("注册成功，返回登录页面进行登录");
                    window.location.href="login.html";
                }
            });
        }
        else{
            $("#clickbuttonerror").text("请按照要求填写信息");
        }
    })

});

function fillProvince(){
    $.ajax({
        type:"post",
        url:"servlet/queryProvinceCity.do",
        data:{},
        dataType:"json",
        success:function(response){
            // console.log(response);
            // console.log(response[0].province);
            // console.log(response[0].provinceId);
            var provinceElement=document.getElementById("province");
            var index;
            provinceElement.options.lenghth=0;
            provinceElement.add(new Option("请选择省份",""));
            for(index =0;index<response.length;index++){
                // console.log[index];
                provinceElement.add(new Option(response[index].province,
                                     response[index].provinceId));
            }
        }
    })
}
	
	

