var startX;         //鼠标起始点击位置
var startY;
var objX;           //拖拽元素起始位置
var objY;
var draggingObj;
var wrap = document.getElementsByClassName('drag-wrap');
var oLi = $("#drag-container").getElementsByTagName("li");
var isDrag = false;
//重新排列每个块的位置
function reSet() {
    var item = draggingObj.nextElementSibling;
    while(item){
        item.style.top = parseInt(item.style.top) - 40 + "px";
        item = item.nextElementSibling;
    }
}
//块被拖拽后，添加到特定的位置
function getLand() {
    var myTop;
    if (draggingObj.parentNode == wrap[0]) {
        if (parseInt(draggingObj.style.left) > 225){
            wrap[1].appendChild(draggingObj);
            myTop = 40*(wrap[1].getElementsByTagName("li").length-1);
            draggingObj.style.left = "0px";
            draggingObj.style.top = myTop + "px";
        } else {
            wrap[0].removeChild(draggingObj);
            wrap[0].appendChild(draggingObj);
            myTop = 40*(wrap[0].getElementsByTagName("li").length-1)
            draggingObj.style.left = "0px";
            draggingObj.style.top = myTop + "px";
        }
    } else {
        if (parseInt(draggingObj.style.left) < -225){
            wrap[0].appendChild(draggingObj);
            myTop = 40*(wrap[0].getElementsByTagName("li").length-1);
            draggingObj.style.left = "0px";
            draggingObj.style.top = myTop + "px";
        } else {
            wrap[1].removeChild(draggingObj);
            wrap[1].appendChild(draggingObj);
            myTop = 40*(wrap[1].getElementsByTagName("li").length-1)
            draggingObj.style.left = "0px";
            draggingObj.style.top = myTop + "px";
        }
    }
}

function dragStart(e) {

    var e = e?e:window.event;
    draggingObj = e.target||e.srcElement;

    if(draggingObj.className != 'drag-item'){
      return console.log('this is not drag-item');
    }
    isDrag = true;


    draggingObj.style.opacity = .8;
    draggingObj.style.zIndex = 10;
    startX = e.clientX;
    startY = e.clientY;
    objX = 0;
    objY = parseInt(draggingObj.style.top);
    reSet();
    document.onmouseup = dragDown;
}
function dragMove(e) {
    var e = e?e:window.event;
    if(isDrag){
        draggingObj.style.left = e.clientX - startX + objX + "px";
        draggingObj.style.top  = e.clientY - startY + objY + "px";
    }
}
function dragDown() {
    isDrag = false;
    draggingObj.style.zIndex = 0;
    getLand();
    draggingObj.style.opacity = 1;
    document.onmouseup = null;
}
window.onload = function(){
    // for(var i = 0; i < oLi.length; i++) {
    //     oLi[i].onmousedown = dragStart;
    // }
    document.onmousedown = dragStart;
    document.onmousemove = dragMove;
}
