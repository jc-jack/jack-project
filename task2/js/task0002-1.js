function uniqArray(arr) {
    var len = arr.length,
        newArr = [];
    for (var i = 0; i < len; i++){
        if (arr[i] !== "" && newArr.indexOf(arr[i]) == -1 ) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
function showHobby(){
    var value = $('.mytextarea').value;
    var arr = value.split(/[\s;；、,，]/)
    var hobby = uniqArray(arr);
    var len = hobby.length;
    if(hobby.length == 0){
        $(".error").innerHTML = "请至少输入一个爱好"
    } else if(hobby.length > 10) {
        if($(".result")){
            $("#myform").removeChild($(".result"));
        }
        $(".error").innerHTML = "请输入十个以内爱好"
    } else {
        if($(".result")){
            $("#myform").removeChild($(".result"));
        }
        $(".error").innerHTML = ""; //删除error元素
        var div = document.createElement("div")
        var h2 = document.createElement("h2")

        div.className = "result";
        h2.innerHTML = "爱好：";
        div.appendChild(h2);
        console.log(hobby);
        for (var i = 0, len = hobby.length; i< len;i++){
            var label = document.createElement("label");
            var checkbox = document.createElement("input");
            var hobbytext = document.createTextNode(hobby[i]);
            checkbox.type = "checkbox";
            checkbox.id = "hobby" + i;
            label.for = "hobby" + i;
            label.appendChild(checkbox);
            label.appendChild(hobbytext);
            div.appendChild(label);
        }
         $("#myform").appendChild(div);
    }
}

function resetHobby() {
    $(".error").innerHTML = "";
    $('.mytextarea').value = "";
    if($(".result")){
            $("#myform").removeChild($(".result"));
    };
}
$.click(".btn-click", function(ev) {
    var ev = ev?ev:window.event;
    var oTag = ev.target || ev.srcElement;
    if( oTag.type == "button"){
        showHobby.call(oTag);
    } else if( oTag.type == "reset") {
        resetHobby.call(oTag);
    }
});
