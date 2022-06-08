/**
 * 主页脚本功能：
 *      1.高考倒计时/毕业计时
 *      2.网站小贴士(快速入门)
 *      3.bgm播放器
 *      4.点赞/投诉入口(添加趣味躲避效果)
 *      5.未来根据能力情况添加主页2D看板娘(仅在触发4时，说两句话而已)
 *      6.未来根据时间以及能力情况，添加不同主题
 *      7.未来根据能力情况，添加登录功能
 */

// 网站快速入门
var buttonLeft = document.getElementById('buttonLeft');
var buttonRight = document.getElementById('buttonRight');
var index = 0;
setHelpImgWrapperWidth();
function setHelpImgWrapperWidth() {
    var helpImg = document.getElementsByClassName('helpImg');
    var helpImgWrapper = document.getElementById('helpImgWrapper');
    helpImgWrapper.style.width = (helpImg[0].offsetWidth * (helpImg.length + 1)) + "px";
}
buttonLeft.onclick = function () {
    showHelpImg("left");
}
buttonRight.onclick = function () {
    showHelpImg("right");
}
function showHelpImg(args) {
    var helpImg = document.getElementsByClassName('helpImg');
    var helpImgWrapper = document.getElementById('helpImgWrapper');
    if (args === "left") {
        index--;
        if (index < 0) {
            index++;
            return;
        }
        moveHelpImg(helpImgWrapper, helpImg, index);
    } else if (args === "right") {
        index++;
        if (index > helpImg.length - 1) {
            index--;
            return;
        }
        moveHelpImg(helpImgWrapper, helpImg, index);
    }
}

function moveHelpImg(target, img, index) {
    var width = img[0].offsetWidth;
    target.style.marginLeft = -(width * index) + "px";
}



// bgm播放器
//实例化对象
var bgmPlayer = document.getElementById('bgmPlayer');
var musicSource = ["你一定能成为你想成为的大人.mp3", "未来再见.mp3"];
var musicTitle = ["[你一定能成为你想成为的大人]----网络群星", "[未来再见]----HOYO-Mix"];
var bgmInfoWrapper = document.getElementById('bgmInfoWrapper');
var bgmInfo = document.getElementById('bgmInfo');
var bgmPlayControl = document.getElementById('bgmPlayControl');
var bgmPlayStateControl = document.getElementById('bgmPlayStateControl');
var bgmPlay = document.getElementById('bgmPlay');
var bgmIndex = document.getElementById('bgmIndex');
var musicIndex = 0;


//初始化
bgmPlayer.src = "music/" + musicSource[musicIndex];
bgmInfo.innerHTML = musicTitle[musicIndex];
getMusic(musicIndex);


//主动上下曲
bgmPlayControl.onclick = function () {
    musicIndex++;
    if (musicIndex > musicSource.length - 1) {
        musicIndex--;
        return;
    }
    getMusic(musicIndex);
    playMusic(true);
}
bgmPlayControl.oncontextmenu = function () {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = 0;
        return;
    }
    getMusic(musicIndex);
    playMusic(true);
}

//获取音乐路径并更改描述
function getMusic(index) {
    bgmPlayer.src = "music/" + musicSource[index];
    bgmInfo.innerHTML = musicTitle[index];
    bottomIndex(index);
    return index;
}

//播放/暂停音乐
function playMusic(state) {
    if (state) {
        bgmPlayer.play();
        bgmPlayer.muted = false;
        bgmPlay.className = "bgmPause";
        bgmInfoMoveControl(false);
        bgmInfoMoveControl(true);
    } else {
        bgmPlayer.pause();
        bgmPlay.className = "bgmPlay";
        bgmInfoMoveControl(false);
    }
}


//播放/暂停按钮动态效果及功能
function transPause_play() {

    if (bgmPlay.className === "bgmPause") {
        bgmPlay.className = "bgmPlay";
        bgmPlayStateControl.title = "播放";
        playMusic(false);

    } else if (bgmPlay.className === "bgmPlay") {
        bgmPlay.className = "bgmPause";
        bgmPlayStateControl.title = "暂停";
        playMusic(true);

    }
}

//bgm文本走马灯
bgmInfoWrapper.style.width = "100%";
var bgmInfoWrapperWidth = bgmInfoWrapper.clientWidth;
var bgmInfoLeftMoved = bgmInfoWrapperWidth;

var bgmInfoMoveSpeed = 10;//数值越大速度越慢，动画帧数越低(单位:ms)
function bgmInfoMove() {
    var bgmInfoWidth = bgmInfo.clientWidth;
    bgmInfoLeftMoved = bgmInfoLeftMoved - 0.8;
    bgmInfo.style.left = bgmInfoLeftMoved + "px";
    var bgmInfoLeft = bgmInfo.offsetLeft;
    if (bgmInfoLeft <= -bgmInfoWidth) {
        bgmInfo.style.marginLeft = "100%";
        bgmInfoLeftMoved = bgmInfoWrapperWidth;
    }
}

bgmMarquee = setInterval(bgmInfoMove, 9000000000);

function bgmInfoMoveControl(state) {
    if (state) {
        bgmMarquee = setInterval(bgmInfoMove, bgmInfoMoveSpeed);
        autoShiftBgm = setInterval(autoShiftBgmFunc, 200);
    } else if (state === false) {
        clearInterval(bgmMarquee);
        clearInterval(autoShiftBgm);
    }
}



//自动上下曲(不考虑单曲循环，因为播放器装不下按钮了.../未来添加了设置功能时也许会放到里面去)
autoShiftBgm = setInterval(autoShiftBgmFunc, 200);
function autoShiftBgmFunc() {
    if (bgmPlayer.currentTime >= bgmPlayer.duration - 1) {
        musicIndex++;
        if (musicIndex > musicSource.length - 1) {
            musicIndex = 0;
        }
        getMusic(musicIndex);
        playMusic(true);
    }
}

//底部音乐曲目指示
function bottomIndex(index) {
    bgmIndex.innerHTML = index + 1 + "/" + musicSource.length;
    bgmIndex.title = "第" + (index + 1) + "首，" + "共" + musicSource.length + "首"; 
}





// 趣味点赞
//获取节点
var ThumbsUpBox = document.getElementById('ThumbsUpBox');
var ThumbsUpOutContent = document.getElementById('ThumbsUpOutContent');
var thumbsUp = document.getElementById('ThumbsUp');
var dislike = document.getElementById('dislike');
var thumbsInfo = document.getElementById('ThumbsInfo');
var live2dJs = document.getElementById('live2dJs');
var thumbsInfoContent1 = "我们会感谢您这样做";
var thumbsInfoContent2 = "您觉得本网站如何";
var thumbsInfoContent3 = "非常感谢您的支持";
var thumbsInfoContent4 = "我们不建议您这样做";
var thumbsInfoContent5 = "假惺惺，哼！！";
var state = true;
var thumbsCount = 0;

//绑定事件
thumbsUp.onmousemove = function(){
    if(thumbsCount === 0){
        thumbsInfoChange(state,thumbsInfoContent1);
    }
}
thumbsUp.onmouseout = function(){
    if(thumbsCount === 0){
        thumbsInfoChange(state,thumbsInfoContent2);
    }
    if(thumbsCount >= 1){
        thumbsInfoChange(state,thumbsInfoContent2);
    }
}
thumbsUp.onclick = function(){
    if(thumbsCount === 0){
        thumbsInfoChange(state,thumbsInfoContent3);
        state = false;
        dislike.style.pointerEvents = "none";
        thumbsUp.style.pointerEvents = "none";
        var timer = 0;
        var thumbsInfoRecover = setInterval(function(){
            timer++;
            if(timer === 3){
                state =true;
                dislike.style.pointerEvents = "auto";
                thumbsUp.style.pointerEvents = "auto";
                thumbsInfoChange(state,thumbsInfoContent2);
                clearInterval(thumbsInfoRecover);
            }
        },1000)
    }
    if(thumbsCount >= 1 && thumbsCount < 10){
        thumbsInfoChange(state,thumbsInfoContent5);
        state = false;
        dislike.style.pointerEvents = "none";
        thumbsUp.style.pointerEvents = "none";
        var timer = 0;
        var thumbsInfoRecover = setInterval(function(){
            timer++;
            if(timer === 3){
                state =true;
                dislike.style.pointerEvents = "auto";
                thumbsUp.style.pointerEvents = "auto";
                thumbsInfoChange(state,thumbsInfoContent2);
                clearInterval(thumbsInfoRecover);
            }
        },1000)
    }
    if(thumbsCount === 12){
        thumbsInfoChange(state,thumbsInfoContent5);
        state = false;
        dislike.style.pointerEvents = "none";
        thumbsUp.style.pointerEvents = "none";
        var timer = 0;
        var thumbsInfoRecover = setInterval(function(){
            timer++;
            if(timer === 3){
                state =true;
                dislike.style.pointerEvents = "auto";
                thumbsUp.style.pointerEvents = "auto";
                thumbsInfoContent2 = "那就这样吧，我已经心满意足了，拜拜";
                thumbsInfoChange(state,thumbsInfoContent2);
                
            }
            if(timer === 6){
                var timer1 = 0;
                var ThumbsUpBoxOut = setInterval(function(){
                    timer1++;
                    if(timer1 === 1){
                        ThumbsUpBox.style.transition = "2s";
                        ThumbsUpBox.style.right = "12%";
                    }
                    if(timer1 === 21){
                        ThumbsUpBox.style.transition = "0.5s";
                        ThumbsUpBox.style.right = "-500%";
                        var script = document.createElement("script");
                        script.type = "text/javascript";
                        script.src = "live2d-widget-master/autoload.js";
                        document.body.appendChild(script);
                        clearInterval(ThumbsUpBoxOut);
                        clearInterval(thumbsInfoRecover);
                    }
                },100);
            }
        },1000)
    }
}

dislike.onmousemove = function(){
    if(thumbsCount === 0){
        thumbsInfoChange(state,thumbsInfoContent4);
    }
    if(thumbsCount === 1){
        thumbsInfoTransform("left","请你不要过来了");
    }
    if(thumbsCount === 2){
        thumbsInfoTransform("right","请你要脸一点兄弟");
    }
    if(thumbsCount === 3){
        thumbsInfoTransform("left","大家都不容易");
    }
    if(thumbsCount === 4){
        thumbsInfoTransform("right","何必苦苦相逼呢你说对吧");
    }
    if(thumbsCount === 5){
        thumbsInfoTransform("left","喂喂喂你还要我躲到什么时候");
    }
    if(thumbsCount === 6){
        thumbsInfoTransform("right","你再这样我报警了啊");
    }
    if(thumbsCount === 7){
        thumbsInfoTransform("left","得得得得得，让你点还不行么");
    }
}
dislike.onmouseout = function(){
    thumbsInfoChange(state,thumbsInfoContent2);
}
dislike.onmousedown = function(){
    if(thumbsCount === 0){
        var timer = 0;
        thumbsInfoContent2 = "我躲，点不着！！";
        dislike.style.pointerEvents = "none";
        var dislikeEventChange = setInterval(function(){
            timer++;
            if(timer === 1){
                dislike.style.right = "-55%";

                thumbsInfoChange(state,thumbsInfoContent2);
            }
            if(timer === 3){
                dislike.style.pointerEvents = "auto";
                thumbsCount++;
                clearInterval(dislikeEventChange);
            }
        },100);
    }
    if(thumbsCount === 8){
        thumbsInfoTransform("switch","欸~~就知道你一定会点");
    }
    if(thumbsCount === 9){
        thumbsInfoTransform("reSwitch","喂喂喂你穷追不舍么");
    }
    if(thumbsCount === 10){
        thumbsInfoTransform("switch","过分了啊");
    }if(thumbsCount === 11){
        thumbsInfoTransform("convert","哼哼哼，这下看你怎么办，有种点啊？");
        thumbsInfoContent5 = "这才对嘛，不就一个点赞吗多大点事儿";
    }
}

function thumbsInfoTransform(affair,content){
    var timer = 0;
    dislike.style.pointerEvents = "none";   
    var dislikeEventChange = setInterval(function(){

        timer++;
        if(timer === 1){
            if(affair === "left"){
                dislike.style.right = "0";
            }
            if(affair === "right"){
                dislike.style.right = "-55%";
            }
            if(affair === "switch"){
                thumbsUp.style.left= "50%";
                dislike.style.right = "50%";
                thumbsUp.style.borderRadius = "0 20px 20px 0";
                dislike.style.borderRadius = "20px 0 0 20px";
            }
            if(affair === "reSwitch"){
                thumbsUp.style.left= "0";
                dislike.style.right = "0";
                thumbsUp.style.borderRadius = "20px 0 0 20px";
                dislike.style.borderRadius = "0 20px 20px 0";
            }
            if(affair === "convert"){
                thumbsUp.style.left= "25%";
                dislike.style.display = "none";
                thumbsUp.style.borderRadius = "20px 20px 20px 20px";
            }
            thumbsInfoContent2 = content;
            thumbsInfoChange(state,thumbsInfoContent2);
        }
        if(timer === 4){
            dislike.style.pointerEvents = "auto";
            thumbsCount++;
            clearInterval(dislikeEventChange);
        }
    },100);
}

function thumbsInfoChange(state,content){
    if(state){
        thumbsInfo.innerHTML = content;
    }else{
        return;
    }
}





console.log("主页脚本加载正常.");