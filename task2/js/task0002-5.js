var startX;         //鼠标起始点击位置
var startY;
var objX;           //拖拽元素相对于整个container的起始位置
var objY;
var draggingObj;    //正在被拖拽的元素
var wrap = document.getElementsByClassName('drag-wrap');
var oLi = $("#drag-container").getElementsByTagName("li");
var isDrag = false;

//重新排列每个块的位置
function reSet(target, current) {
    var myTop = parseInt(draggingObj.style.top);
    var tItem = target.getElementsByTagName("li");
    var len = tItem.length;
    var lastItem = tItem[len-1];
    //当拖拽元素的拖拽高度小于目标列表中某个块的offsetTop时，拖拽元素会插入到该块前面
    if (len == 0 || myTop >= lastItem.offsetTop) {
        target.appendChild(draggingObj);
    } else {
        for (var i = 0; i < len; i++) {
            if (myTop < tItem[i].offsetTop ) { 
                target.insertBefore(draggingObj, tItem[i]);
                break;
            }
        }
    }
}
//根据拖拽元素在container的位置，判断拖拽元素应该哪一列中
function getLand() {
    var currentWrap =  draggingObj.parentNode;
    var targetWrap;
    var x = objX + parseInt(draggingObj.style.left);      //鼠标弹起时拖拽元素在整个container中的位置
    if ( x <= 375) {
        targetWrap = wrap[0];
    } else {
        targetWrap = wrap[1];
    }
    reSet(targetWrap, currentWrap);
}   

function dragStart(e) {
    isDrag = true;
    var e = e?e:window.event;
    draggingObj = e.target || e.srcElement;
    draggingObj.style.top = draggingObj.offsetTop + "px"; //因为当点击拖拽元素时会转化为绝对定位，需要初始化他的高度。
    addClass(draggingObj, "dragging");
    startX = e.clientX;
    startY = e.clientY; 
    objX = draggingObj.parentNode.offsetLeft;
    objY = draggingObj.offsetTop;
    document.onmouseup = dragDown;
}
function dragMove(e) {
    var e = e?e:window.event;
    if (isDrag){
        draggingObj.style.left = e.clientX - startX + "px";
        draggingObj.style.top  = e.clientY - startY + objY + "px";
    }
}
function dragDown() {
    isDrag = false;
    getLand();
    draggingObj.style.top =  0;
    draggingObj.style.left = 0;
    removeClass(draggingObj, "dragging");
}

window.onload = function(){
    for (var i = 0; i < oLi.length; i++) {
        oLi[i].onmousedown = function(){
            dragStart();
        }
    }
    document.onmousemove = dragMove;
}