//管理进度条功能
(function($, root){
    var $scope = $(document.body);
    var startTime; //开始时间
    var curDuration; //歌曲总时长
    var frameId;
    var lastPercetage = 0; //上一次播放百分比
    //转换时间
    function formatTime(time){
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if(minute < 10){
            minute = "0" + minute;
        }
        if(second < 10){
            second = "0" + second;
        }
        return minute + ":" +second;
    }
    //渲染总时间
    function render(duration){
        curDuration = duration;
        lastPercetage = 0;
        updata(0);      
        var allTime = formatTime(duration);
        $scope.find(".all-time").text(allTime);
    }
    //渲染进度条
    function setProcessor(percentage){
        var percent = (percentage - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            "transform" : "translateX(" + percent + ")"
        });
    }
    //渲染已播放时间
    function updata(percentage){
        var curTime = formatTime(percentage * curDuration);
        $scope.find(".cur-time").text(curTime);
        setProcessor(percentage);
    }
    
    //开始渲染时间和进度条
    function start(percentage){
        if(percentage === undefined){   //不是拖动时
            lastPercetage = lastPercetage;
        }else{  //拖动时
            lastPercetage = percentage;
        }
        cancelAnimationFrame(frameId); //清除定时器
        startTime = new Date().getTime(); //获取开始时间
        function frame(){
            var curTime = new Date().getTime(); //获取当前时间
            var percentage = lastPercetage + (curTime -startTime) / (curDuration * 1000); //播放时长与总时长的百分比
            if(percentage < 1){
                updata(percentage);
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    }
    //暂停时间和进度条
    function stop(){
        var curTime = new Date().getTime();
        lastPercetage += (curTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    root.processor = {
        render : render,
        updata : updata,
        start : start,
        stop : stop
    }
})(window.Zepto, window.player || (window.play = {}))