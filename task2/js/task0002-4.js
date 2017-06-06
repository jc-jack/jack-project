var dateStr = ["a", "ada", "anna", "aseddf", "boy", "book", "boll", "cat", "ca", "cold", "deck", "desk", "doll", "doom", "distractoin", "ella", "alin", "fd", "doos", "park"];
var myText = $(".search-box");
var oLi = $("#show-list").getElementsByTagName('li');
var oUl = $("#show-list");
var index = 0;          //标记搜索提示被选中项的位置
var result = [];        //储存匹配的数据

window.onload = function() {
    for(var i = 0, len = oLi.length; i < len; i++) {
        oLi[i].onclick = function(){
            myText.value = this.innerHTML;
            clear();
        }
        oLi[i].onmouseover = function() {
            if (oLi[index-1]) {
                oLi[index-1].className = "";
            };
            this.className = "active";
            index = this.getAttribute("index");
        }
        oLi[i].onmouseout = function() {
            this.className = "";
            oLi[index-1].className = "";
            index = 0;
        }
    }
}

//用于显示匹配的数据
function showHints() {
    clear();
    var str = $(".search-box").value;
    if(str){
        var reg = new RegExp("^" + str, "i");
        result = dateStr.filter(function(item) {
            return item.match(reg);
        });
        if(result[0]){
            oUl.style.display = "block";
            for (var i = 0 , len = result.length; i < len ; i++ ) {
                oLi[i].innerHTML = result[i];
                if(i == 4){
                    break;
                }
            }
        } else {
            clear();
        }
    }
}
//键盘事件（上下键和确认键）
function keydown(e) {
    var e = e?e:window.event;
    var keyNum = e.keyCode;
    var len = result.length
    switch (keyNum) {
        case 38:
            index--;
            for (var i = 0; i < len; i++){
                oLi[i].className = "";
            }
            if (index < 1) {
                index = len;
            }
            oLi[index-1].className = "active";
            break;
        case 40:
            index++;
            for (var i = 0; i < len; i++){
                oLi[i].className = "";
            }
            if (index > len) {
                index = 1;
            }
            oLi[index-1].className = "active";
            break;
        case 13:
            myText.value = oLi[index-1].innerHTML;
            clear();
            break;
    }
}




function clear() {
    for (var i = 0 ; i < 5 ; i++ ) {
            oLi[i].innerHTML = "";
    }
    oUl.style.display = "none";
    oLi[index].className = "";
    index = 0;
}

console.log();


