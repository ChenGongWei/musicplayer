//播放列表模块
(function($, root){
    var $scope = $(document.body);
    var controlmanager;
    var $playList = $('<div class="play-list">' + 
                        '<div class="line-head">播放列表</div>' +
                        '<ul class="play-list-wrap"></ul>' +
                        '<div class="close-btn">关闭</div>' +
                    '</div>')
    //渲染
    function render(data){
        var html = '';
        var len = data.length;
        for(var i = 0; i < len; i++){
            html += '<li><h3>' + data[i].song + '-<span>' + data[i].singer + '</span></h3></li>'
        }
        $playList.find('ul').html(html);
        $scope.append($playList);
        bindEvent();
    }
    //绑定事件
    function bindEvent(){
        $playList.on('click', '.close-btn', function(){
            $playList.removeClass('show'); //隐藏
        }).on('click', 'li', function(){ //点击切换歌曲
            var index = $(this).index();
            signSong(index);
            $scope.trigger("play:change", [index, true]);
            $scope.find('.play-btn').addClass('playing');
            setTimeout(function(){
                $playList.removeClass('show');
            },500)
            controlmanager.index = index;
        })
    }
    //显示列表
    function show(control){
        controlmanager = control;
        var index = controlmanager.index; //当前第几首歌
        $playList.addClass("show");
        signSong(index);
    }
    //标记当前歌曲
    function signSong(index){
        $playList.find('.playing').removeClass('playing');
        $playList.find('li').eq(index).addClass('playing');
    }
    root.playlist = {
        render : render,
        show : show
    }
})(window.Zepto, window.player || (window.player = {}))