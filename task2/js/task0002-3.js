window.onload = function() {
    var container = $("#container");
    var prev = $("#prev");
    var next = $("#next");
    var list = $("#pic-list");
    var timer;
    var index = 1;
    var buttons = $(".button").getElementsByTagName("li");
    var animated = false; //判断animate函数是否在运行

    //显示两个切换图片的按钮
    container.onmouseover = function() {
        prev.style.display = "block";
        next.style.display = "block";
    }
    container.onmouseout = function() {
        prev.style.display = "none";
        next.style.display = "none";
    }

    //显示相应的button图标
    function buttonsShow() {
        for(var i = 0, len = buttons.length; i < len; i++) {
            if(buttons[i].className == "on"){
                buttons[i].className = "";
                break;
            }
        }
        //数组从0开始，所以要-1
        buttons[index-1].className = "on";
    }
    //图片轮换
    function animate(offset) {
        animated = true;
        var newleft = parseInt(list.style.left) + offset;
        var time = 300; //位移的总时间
        var interval = 10; //位移的间隔时间
        var speed = offset/(time/interval);//每次位移的距离;
        //动画效果，每隔10毫秒图片位移20px
        function go() {
            if( (speed < 0 && parseInt(list.style.left) > newleft) || (speed > 0 && parseInt(list.style.left) < newleft) ) {
                list.style.left =  parseInt(list.style.left) + speed  + "px";
                setTimeout(go, interval);
            }
            else {
                animated = false;
                if(newleft > -600){
                    newleft = -3000;
                } else if (newleft < -3000) {
                    newleft = -600;
                }
                list.style.left = newleft + "px";
            }
        }
        go();
    }

    //正向轮播
    function forw(){
        clearInterval(timer);
        buttonsShow();
        timer = setInterval(next.onclick, 1500);
    }
    //反向轮播
    function reve(){
        clearInterval(timer);
        buttonsShow();
        timer = setInterval(prev.onclick, 1500);
    }
    //停止轮播
    function stop() {
        clearInterval(timer);
    }
    //点击button图标，切换图片
    function buttonClick() {
        //当点击的按钮已经是当前页面的按钮时，不会执行后续代码
        if(!animated){
            if (this.className == "on") {
                return;
            }
            var clickIndex = parseInt(this.getAttribute("index"));
            var offset = (index - clickIndex)*600;
            animate(offset);
            index = clickIndex;
            buttonsShow();
        }
    }


    prev.onclick = function(){
        if(!animated){
            index--;
            if(index < 1) {
                index = 5;
            }
            buttonsShow();
            animate(600);
        }
    };
    next.onclick = function(){
        if(!animated){
            index++;
            if(index > 5) {
                index = 1;
            }
            buttonsShow();
            animate(-600);
        }
    };
    $.click("#forward", forw);//正向播放按钮
    $.click("#reverse", reve);//反向播放按钮
    $.click("#stop", stop);//停止按钮
    $.click(".button", function(ev) {
        var ev = ev?ev:window.event;
        var oTag = ev.target || ev.srcElement;
        var clickindex = oTag.getAttribute("index");
        if(oTag.tagName == "LI") {
            buttonClick.call(oTag);
        }
    });
}
