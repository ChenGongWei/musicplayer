var root = window.player;  //获取含各个功能模块的对象
var $ = window.Zepto;  //Zepto相当于精简版的jQuery
var $scope = $(document.body);  //全局变量
var songList;   //储存歌曲信息
var controlmanager; //储存索引管理对象
var audiomanager = new root.audioManager(); //歌曲管理对象
var processor = root.processor; //进度条管理对象
var playlist = root.playlist; //歌曲列表管理对象

$scope.on("play:change", function(e, index, flag){ //自定义事件
    var curdata = songList[index];
    root.render(songList[index]);   //渲染歌曲信息
    audiomanager.setAudioSource(curdata.audio); //设置歌曲路径
    if(audiomanager.status == "play" || flag){       
        audiomanager.play();
        processor.start();
    } 
    processor.render(curdata.duration); //设置歌曲时间
})

//上一首
$scope.on("click", ".prev-btn", function(){ 
    var index = controlmanager.prev(); 
    $scope.trigger("play:change", [index]);
})

//下一首
$scope.on("click", ".next-btn", function(){ 
    var index = controlmanager.next();
    $scope.trigger("play:change", [index]);
})

//播放或暂停
$scope.on("click", ".play-btn", function(){ 
    if(audiomanager.status == "play"){       
        audiomanager.pause();
        processor.stop(); //暂停时间和进度条
    } else {
        audiomanager.play();
        processor.start(); //开始时间和进度条
    }
    //toggleClass(class): 没有该样式时添加，有则删除 
    $scope.find(".play-btn").toggleClass("playing");
})

//播放列表
$scope.on("click", ".list-btn", function(){
    playlist.show(controlmanager);
})

//绑定touch事件
function bindTouch(){
    var $slidePoing = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoing.on("touchstart", function(e){ //开始拖动
        processor.stop();
    }).on("touchmove", function(e){ //拖动中
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1){
            percentage = 1;
        }else if(percentage < 0){
            percentage = 0;
        }
        processor.updata(percentage);      
    }).on("touchend", function(e){ //拖动结束
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1){
            percentage = 1;
        }else if(percentage < 0){
            percentage = 0;
        }
        processor.start(percentage);
        var curDuration = songList[controlmanager.index].duration;
        var duration = curDuration * percentage;
        audiomanager.jumptoPlay(duration);
        $scope.find('.play-btn').addClass('playing');
    })
}

//获取所有歌曲信息
function getData(url){
    $.ajax({
        url: url,
        type: "GET",
        success: successedFn,
        erorr: function(){
            console.log("error");
        }
    })
}
function successedFn(data){ //数据获取成功的回调函数
    bindTouch();
    songList = data;    //储存获取的全部歌曲信息
    controlmanager = new root.controlManager(data.length); //获得索引管理对象
    $scope.trigger("play:change", [0]);
    playlist.render(data);
}
getData("https://raw.githubusercontent.com/ChenGongWei/musicplayer/master/mock/data.json");
