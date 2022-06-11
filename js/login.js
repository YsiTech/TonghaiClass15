//初步检验用户名和密码是否有效
//建立cookie
function passArgs(){
    window.location.replace("主页.html?"+"txt="+encodeURI(Name));
}

document.getElementById("loginbutton").onclick=function(){
    //获取用户名和密码
    Name=document.getElementById("Name").innerHTML;
    username=document.getElementById("username").value;
    password=document.getElementById("password").value;
    //开始检验
    if(username==""||password==""){
        alert("用户名或密码不能为空!");
    }else{
        var reg=/[A-Za-z0-9_]/;
        if(!reg.test(password)){
            alert("密码只能由字母、数字、下划线组成!");
        }else{
            if(password.length<6||password.length>20){
                alert("密码长度在六位到二十位之间!");
            }else{
                if(username=="王刚scpx"&&password=="a12345"){
                    //传输参数到主页
                    passArgs();
                }else{
                    alert("网页还在测试阶段，请使用管理员用户名登录。");
                }
            }
        }
    }
}

//检测用户名
//创建名单
var users=new Array("补位","scpx1","scpx2","scpx3","scpx4","scpx5","scpx6","scpx7","scpx8","scpx9","scpx10","scpx11","scpx12","scpx13","scpx14","scpx15","scpx16","scpx17","scpx18","scpx19","scpx20","scpx21","scpx22","scpx23","scpx24","scpx25","scpx26","scpx27","scpx28","scpx29","scpx30","scpx31","scpx32","scpx33","scpx34","scpx35","scpx36","scpx37","scpx38","scpx39","scpx40","scpx41","scpx42","scpx43","scpx44","scpx45","scpx46","scpx47","scpx48","scpx49","scpx50","scpx51","王刚scpx");
function nameChange(reg){
    if(reg==1){
        Name=document.getElementById("Name");
        Name.style.height=20+"px";
        Name.style.marginTop=0+"px";
    }else{
        Name=document.getElementById("Name");
        Name.style.height=0+"px";
        Name.style.marginTop=20+"px";
    }
}
function checkUsername(reg){
    if(reg==0){
        return;
    }
    //每0.2s检测一次
    setInterval(function(){
        username=document.getElementById("username").value;
        switch(username){
            case users[1]:
                Name.innerHTML="唐汶蝶";nameChange(1);break;
 case users[2]:
                Name.innerHTML="唐琳欣";nameChange(1);break;
 case users[3]:
                Name.innerHTML="王香怡";nameChange(1);break;
 case users[4]:
                Name.innerHTML="姚海涛";nameChange(1);break;
 case users[5]:
                Name.innerHTML="李行宇";nameChange(1);break;
 case users[6]:
                Name.innerHTML="彭海霞";nameChange(1);break;
 case users[7]:
                Name.innerHTML="姜帆";nameChange(1);break;
 case users[8]:
                Name.innerHTML="周琪";nameChange(1);break;
 case users[9]:
                Name.innerHTML="蒲林彧";nameChange(1);break;
 case users[10]:
                Name.innerHTML="周鑫怡";nameChange(1);break;
 case users[11]:
                Name.innerHTML="秦澜";nameChange(1);break;
 case users[12]:
                Name.innerHTML="陈陈";nameChange(1);break;
            case users[13]:
                Name.innerHTML="蒋雯";nameChange(1);break;
            case users[14]:
                Name.innerHTML="敬雨馨";nameChange(1);break;
            case users[15]:
                Name.innerHTML="黄蕾洢";nameChange(1);break;
            case users[16]:
                Name.innerHTML="王锶璐";nameChange(1);break;
            case users[17]:
                Name.innerHTML="雷雨嫣";nameChange(1);break;
            case users[18]:
                Name.innerHTML="王宇杭";nameChange(1);break;
            case users[19]:
                Name.innerHTML="何雨桐";nameChange(1);break;
            case users[20]:
                Name.innerHTML="宋梓嘉";nameChange(1);break;
            case users[21]:
                Name.innerHTML="刘鑫雨";nameChange(1);break;
            case users[31]:
                Name.innerHTML="马文雯";nameChange(1);break;
            case users[32]:
                Name.innerHTML="王瑜";nameChange(1);break;
            case users[39]:
                Name.innerHTML="夏静熠";nameChange(1);break;
case users[52]:
                Name.innerHTML="王刚";nameChange(1);break;
           
            default:nameChange(0);
        }
    },200)
}

