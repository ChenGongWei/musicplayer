//管理歌曲模块
(function($, root){
    $scope = $(document.body);
    function audioManager(){
        this.audio = new Audio();
        this.status = "pause"; //歌曲状态
        this.bindEvent();
    }
    audioManager.prototype = {
        //绑定事件
        bindEvent : function(){
            $(this.audio).on("ended", function(){ //歌曲播放完的事件
                $scope.find(".next-btn").trigger("click"); //触发下一首按钮的点击事件
            })
        },
        //歌曲播放功能
        play : function(){
            this.audio.play();
            this.status = "play";
        },
        //歌曲暂停功能
        pause : function(){
            this.audio.pause();
            this.status = "pause";
        },
        //切换歌曲的音频路径
        setAudioSource : function(src){
            this.audio.src = src;
            this.audio.load();
        },
        //跳转到对应位置播放
        jumptoPlay : function(duration){
            this.audio.currentTime = duration;
            this.play();
        }
    }
    root.audioManager = audioManager;
})(window.Zepto, window.player || (window.player = {}))