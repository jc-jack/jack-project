
var stop; //设置全局变量stop，来清楚超时调用
function countTime() {
    var value = $(".time-text").value;
    var r = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);//match返回一个数组，第二个数组项开始是捕获组
    //验证输入日期格式是有正确
    if (r == null ) {
        resetTime();
        return $(".error").innerHTML = "请按照格式输入日期";
    }
    //验证日期是否为有效日期
    var endDate = new Date(r[1], r[2]-1, r[3]);
    var check = endDate.getFullYear() == r[1] && (endDate.getMonth()+1) == r[2] && endDate.getDate() == r[3];
     var today = new Date();
    if (check == false) {
        resetTime();
        return $(".error").innerHTML = "请输入正确的日期";
    }else if (endDate - today < 0) {
        resetTime();
        return $(".error").innerHTML = "请输入一个未来的日期";
    } else {
        resetTime();
        var countAllTime = endDate - today;
        var w_countDay = countAllTime/(24*3600*1000);
        var countDay = Math.floor(w_countDay);
        var w_countHour = (w_countDay - countDay)*24;
        var countHour = Math.floor(w_countHour);
        var w_countMin = (w_countHour - countHour)*60;
        var countMin = Math.floor(w_countMin);
        var w_countSec = (w_countMin - countMin)*60;
        var countSec = Math.floor(w_countSec);
        $(".show-time").innerHTML = "距离" + r[1] + "年" + r[2] +"月" + r[3] + "日还有"  + countDay+ "天" + countHour 
                                     + "小时" + countMin +  "分"+ countSec  + "秒";
        stop = setTimeout(countTime, 1000);
    }
}
function resetTime(){
    clearTimeout(stop);
    $(".error").innerHTML = "";
    $(".show-time").innerHTML = "";
}


$.click(".settime", function(ev) {
    var ev = ev?ev:window.event;
    var oTag = ev.target || ev.srcElement;
    if( oTag.type == "button"){
        countTime.call(oTag);
    } else if( oTag.type == "reset") {
        resetTime.call(oTag);
    }
})