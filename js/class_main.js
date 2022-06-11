//bgm播放程序
var musics=new Array("如愿.mp3","青春记忆.mp3","wfyl.mp3","我在未来等你.mp3","秦基博 - Himawari No Yakusoku.mp3","菅田将暉 - 虹.mp3","TB1.mp3","believer童声合唱.mp3","believer.mp3",".mp3");
var musicName=new Array("如愿《我和我的父辈》电影原声带","青春记忆(电视剧《少年派》主题曲)","无法原谅《妻子的诱惑》ost","我在未来等你(电视剧《我在未来等你》高一八班合唱版)","向日葵的约定《哆啦A梦：伴我同行2》主题曲","虹《哆啦A梦：伴我同行2》主题曲","苏联TB3《时代，前进》第一期","信徒-童声合唱","信徒","如果是命运韩剧《花游记》OTS","----------A little story----------",);
var musicIndex=3;
var bgmTime=0;
getMusic();
(function(){
    setInterval(function(){
        bgmTime++;
        if(bgmTime==2){
            music.play();
            //bgm名称显示异常修复
            if(musicIndex==3){
                musicIndex=0;
                eval(getBgm+"()");
                music.play();
                musiclogo.style.opacity="1";
            }
        }
    },1000);
})();


var Pause="musicPause";
var Play="musicPlay";
function musicPause(){
    play_stop.style.fontSize=20+"px";
    play_stop.style.transform="rotate(90deg)";
    play_stop.innerHTML="▲";;
    bgmName.scrollAmount="0";
    music.pause();
    musiclogo.style.opacity="0.3";
}
function musicPlay(){
    play_stop.style.fontSize=25+"px";
    play_stop.style.transform="rotate(0deg)";
    play_stop.innerHTML="||";
    bgmName.scrollAmount="5";
    music.play();
    musiclogo.style.opacity="1";
}
//面板展开设置
open_close.onclick=function(){
    if(open_close.innerHTML=="展开"){
    bgmPlayer.style.left=0+"px";
    open_close.innerHTML="收起";
    hidder.style.display="block";
    }else{
        bgmPlayer.style.left=-215+"px";
        open_close.innerHTML="展开";
        hidder.style.display="none";
    }
}
//播放/暂停
play_stop.onclick=function(){
    if(play_stop.innerHTML=="||"){
        eval(Pause+"()");
    }else{
        eval(Play+"()");
    }
}
//上/下一曲
nextM.onclick=function(){
    musicIndex++;
    if(musicIndex>musics.length-1){
        musicIndex=0;
    }
    eval(getBgm+"()");
    eval(Play+"()");
}
lastM.onclick=function(){
    musicIndex--;
    if(musicIndex<0){
        musicIndex=musics.length-1;
    }
    eval(getBgm+"()");
    eval(Play+"()");
}

setInterval(function(){
    if(music.currentTime>=music.duration-1){
        musicIndex++;
        if(musicIndex>musics.length-1){
            musicIndex=0;
        }
        eval(getBgm+"()");
        music.play();
    }
},200)

//获取音乐数据
var getBgm="getMusic";
function getMusic(){
    music.src="music/"+musics[musicIndex];
    bgmName.innerHTML=musicName[musicIndex];
}
