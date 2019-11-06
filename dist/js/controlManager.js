//管理index索引
(function($, root){
    function controlManager(length){  //构造函数
        this.index = 0;
        this.length = length;
    }
    controlManager.prototype = {
        next : function(){  //下一首
            return this.getIndex(1);
        },
        prev : function(){  //上一首
            return this.getIndex(-1);
        },
        getIndex : function(val){ //获得index
            var index = this.index;
            var len = this.length;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    root.controlManager = controlManager;
})(window.Zepto, window.player || (window.player = {}))