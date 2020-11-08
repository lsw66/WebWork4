$(document).ready(function(){

    var userName=$("#userName").val();
    var chrname=$("#chrname").val();
    var mail=$("#mail").val();
    var provinceName=$("#provinceName").val();
   
    var pageSize=$("#pageSize").val();
    var pageNumber=$("#pageNumber").text();
    var sort="userName";
    var sortOrder="desc";

    var data={"userName":userName,"chrname":chrname,"mail":mail,"provinceName":provinceName,"pageSize":pageSize,"pageNumber":pageNumber,"sort":sort,"sortOrder":sortOrder};
    // console.log(data);

    $.ajax({
        type:"post",
        url:"servlet/queryUser.do",
        data:data,
        dataType:"json",
        success:function (response){

            var rows=response.rows;
            // console.log(rows);
            var total=response.total;
            var  pageCount=Math.ceil(total / pageSize);
            // console.log(pageCount);
            $("#total").text(total);
            $("#pageCount").text(pageCount);
            $("tbody").empty();
            $.each(rows,function(index,row){
                var s=JSON.stringify(row);
                var str="<tr data='"+s+"'>";
                str= str +'<td><input type="checkbox" value="'+row.userName+'"/></td>';
                str= str +'<td>'+row.userName+'</td>';
                str= str +'<td>'+row.chrname+'</td>';
                str= str +'<td>'+row.mail+'</td>';
                str= str +'<td>'+row.provinceName+'</td>';
                str= str +'<td>'+row.city+'</td>';
                str= str +'<td><a href="#" id="btnDel" value='+row.username+'>删除</a>';
                str= str +'<a href="#" id="btnUpdate">修改</a></td>';
                str= str +'</tr>';
                $("tbody").append(str);
            });
            $('tbody tr:even').addClass('tr_even');
            $('tbody tr:odd').addClass('tr_odd');
            
          }
    })

    
    $("#btSearch").click(function(){
        var userName_bt=$("#userName").val();
        var chrname_bt=$("#chrname").val();
        var mail_bt=$("#mail").val();
        var provinceName_bt=$("#provinceName").val();
    
        console.log(provinceName_bt);
    
        var pageSize_bt=$("#pageSize").val();
        var pageNumber_bt=$("#pageNumber").text();
        var sort_bt="userName";
        var sortOrder_bt="desc";
    
        var data={"userName":userName_bt,"chrname":chrname_bt,"mail":mail_bt,"provinceName":provinceName_bt,"pageSize":pageSize_bt,"pageNumber":pageNumber_bt,"sort":sort_bt,"sortOrder":sortOrder_bt};
        search(data);
    });

    $("#btClear").click(function(){
        // var userName_bt="";
        // var chrname_bt="";
        // var mail_bt="";
        // var provinceName_bt="";

        // $("#userName").val(" ");
        // $("#chrname").val(" ");
        // $("#mail").val(" ");
        // $("#provinceName").val(" ");

        // var pageSize_bt=$("#pageSize").val();
        // var pageNumber_bt=$("#pageNumber").text();
        // var sort_bt="userName";
        // var sortOrder_bt="desc";
    
        // var data={"userName":userName_bt,"chrname":chrname_bt,"mail":mail_bt,"provinceName":provinceName_bt,"pageSize":pageSize_bt,"pageNumber":pageNumber_bt,"sort":sort_bt,"sortOrder":sortOrder_bt};
        // search(data);
        window.location.reload();
    });

    $("#btDelete").click(function(){
        var len=$('tbody tr input:checkbox:checked').length;
        if(len ==0){
            alert("至少选择一项");
            return;
        }
        console.log($('tbody tr input:checkbox:checked').val());
        var vals=[];
        $('tbody tr input:checkbox:checked').each(function(index,item){
            vals.push("'"+$(this).val()+"'");
        });
        console.log(vals);
        var data={"ids":vals.join(",")};
        console.log(data);
        $.ajax({
            type:"post",
            url:"servlet/deleteUser.do",
            data:data,
            dataType:"json",
            success:function(response){
                alert(response.info);
                if(response.code == 0){
                    window.location.reload();
                }
            }
        })
    });

    $("#back").click(function(){
        var userName_bt=$("#userName").val();
        var chrname_bt=$("#chrname").val();
        var mail_bt=$("#mail").val();
        var provinceName_bt=$("#provinceName").val();
    
        // console.log(provinceName_bt);
        var pageSize_bt=$("#pageSize").val();
        var pageNumber_bt=$("#pageNumber").text();
        var sort_bt="userName";
        var sortOrder_bt="desc";

        if( pageNumber_bt  <2 ){
            alert("已经是第一页");
            return;
        }else{

            pageNumber_bt=parseInt(pageNumber_bt)-1;
            $("#pageNumber").text(pageNumber_bt);
            
            var data={"userName":userName_bt,"chrname":chrname_bt,"mail":mail_bt,"provinceName":provinceName_bt,"pageSize":pageSize_bt,"pageNumber":pageNumber_bt,"sort":sort_bt,"sortOrder":sortOrder_bt};
            search(data);
        }
        
    });

    $("#next").click(function(){
        var userName_bt=$("#userName").val();
        var chrname_bt=$("#chrname").val();
        var mail_bt=$("#mail").val();
        var provinceName_bt=$("#provinceName").val();
        
        var pageSize_bt=$("#pageSize").val();
        var pageNumber_bt=$("#pageNumber").text();
        var sort_bt="userName";
        var sortOrder_bt="desc";

        if( pageNumber_bt >= parseInt($("#pageCount").text())){
            alert("已经是最后一页");
            return;
        }else{

           
            pageNumber_bt=parseInt(pageNumber_bt)+1;
            $("#pageNumber").text(pageNumber_bt);

            var data={"userName":userName_bt,"chrname":chrname_bt,"mail":mail_bt,"provinceName":provinceName_bt,"pageSize":pageSize_bt,"pageNumber":pageNumber_bt,"sort":sort_bt,"sortOrder":sortOrder_bt};
            // console.log(data);
            search(data);
        }
    })

    $("#btAdd").click(function(){
        // ShowDiv('MyDiv', 'fade');
       // console.log($('tbody tr input:checkbox:checked').attr("data"));
    });
    $("#btnUpdate").click(function(){
        console.log(11111);
    })

//============================上次作业重复代码，只是改了名称
    
  

});






function search(data){
    $.ajax({
        type:"post",
        url:"servlet/queryUser.do",
        data:data,
        dataType:"json",
        success:function (response){

            var rows=response.rows;
            console.log(rows);
            var total=response.total;
            var pageSize=$("#pageSize").val();;
            var  pageCount=Math.ceil(total / pageSize);
            console.log(total);
            console.log(pageSize);
            console.log(pageCount);
            $("#total").text(total);
            $("#pageCount").text(pageCount);
            $("tbody").empty();
            $.each(rows,function(index,row){
                var s=JSON.stringify(row);
                var str="<tr data='"+s+"'>";
                str= str +'<td><input type="checkbox" value="'+row.userName+'"/></td>';
                str= str +'<td>'+row.userName+'</td>';
                str= str +'<td>'+row.chrname+'</td>';
                str= str +'<td>'+row.mail+'</td>';
                str= str +'<td>'+row.provinceName+'</td>';
                str= str +'<td>'+row.city+'</td>';
                str= str +'<td><a href="#" id="btnDel" value='+row.username+'>删除</a>';
                str= str +'<a href="#" id="btnUpdate">修改</a></td>';
                str= str +'</tr>';
                $("tbody").append(str);
            });
            $('tbody tr:even').addClass('tr_even');
            $('tbody tr:odd').addClass('tr_odd');
          }
    })
}

function ShowDiv(show_div,bg_div){
    document.getElementById(show_div).style.display="block";
    document.getElementById(bg_div).style.display="block";

}

function CloseDiv(MyDiv,fade){
    document.getElementById(fade).style.display="none";
    document.getElementById(MyDiv).style.display="none";
}

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
            var provinceElement=document.getElementById("h_province");
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

function pop_up(){

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

    if ($("#action").val() =="update"){
        $("#h_username").val()
    }

    $("#h_username").blur(function(){
		if($("#h_username").val() == "")
		{
            $("#t_username").text("用户名不能为空")
			$("#t_username").addClass("error");
        }
        else if(!chr.exec($(this).val())){
            $("#t_username").text("必须以字母开头，只能使用数字和字母，长度为4-15");
			$("#t_username").addClass("error");
        }
		else{
           var username=$("#h_username").val();
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
    $("#h_chrname").blur(function(){
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

    $("#h_email").blur(function(){
        if($(this).val() ==""){
            $("#t_email").text("邮箱不能为空");
            $("#t_email").addClass("error");
        }
        else if(!chr2.exec($(this).val())){
            $("#t_email").text("邮箱格式不正确");
            $("#t_email").addClass("error");
        }
        else{
            var email=$("#h_email").val();
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

    $("#h_password").blur(function(){
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

    $("#h_rpassword").blur(function(){
        var password=$("#h_password").val();
        var rpassword=$("#h_rpassword").val();
        // console.log(password);
        // console.log(rpassword);
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
    $("#h_province").change(function(){
        $("#h_city").empty();
        $("h_city").append($("<option>").val("").text("请选择城市"));
        if($(this).val()==""){
            $("#t_province").text("必须选择省份");
            $("#t_province").addClass("error");
            return;
        }
        confirm=$(this).val();
        provinceIsOK=true;
        $("#t_province").removeClass("error");
        var provinceCode=$("#h_province").val();
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
                    $("#h_city").append(option);
                }
            }
        })
    });

    $("#h_city").change(function(){
        if($("#h_city").val==0){
            $("#t_city").text("必须选择城市");
            $("#t_city").addClass("error");
            return;
        }
        cityIsOK =true;
    })

    $("#clickbutton").click(function () {
        var username = $("#h_username").val();
        var chrname = $("#h_chrname").val();
        var email = $("#h_email").val();
        var password = $("#h_password").val();
        var province=confirm;
        var city=$("#h_city").val();
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
}

// function bt_search(){
//     var userName_bt=$("#userName").val();
//     var chrname_bt=$("#chrname").val();
//     var mail_bt=$("#mail").val();
//     var provinceName_bt=$("#provinceName").val();

//     console.log(provinceName_bt);

//     var pageSize_bt=$("#pageSize").val();
//     var pageNumber_bt=$("#pageNumber").text();
//     var sort_bt="userName";
//     var sortOrder_bt="desc";

//     var data={"userName":userName_bt,"chrname":chrname_bt,"mail":mail_bt,"provinceName":provinceName_bt,"pageSize":pageSize_bt,"pageNumber":pageNumber_bt,"sort":sort_bt,"sortOrder":sortOrder_bt};
//     search(data);
// }
