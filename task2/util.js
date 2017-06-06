

function isArray(arr) {
	return arr instanceof Array;
}
function isFun(fun) {
	return Object.prototype.toString.call(fun) === "[object Function]";
}


//深度克隆
function cloneObject(src) {
	if(isClass(src) == "Object"){
    	var cloneObj = {};
    }
    else if (isClass(src) == "Array"){     //之所以检测src类型是因为如果src为数组的话，src会被转变成对象。
    	var cloneObj = [];
    }
    else {
    	return src;
    }
    for (pro in src){
    	var copy = src[pro];
    	if (isClass(copy) == "Object"){
    		cloneObj[pro] = arguments.callee(copy);
    	}
    	else if(isClass(src[pro]) == "Array"){
    		cloneObj[pro] = arguments.callee(copy);
    	}
    	else {
    		cloneObj[pro] = src[pro];
    	}
    }

    return cloneObj;
}
//判断对象的类型 方法1
function isClass(obj) {
	return Object.prototype.toString.call(obj).slice(8,-1);
}
//判断对象的类型 方法2
function isClass(obj) {
	if(obj instanceof Array){return "Array"}
	else if (obj instanceof Object){return "Object"}
}


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
//方法1用splice删除相同的数组项
function uniqArray1(arr) {
    for(var i= 0 ; i < arr.length; i++){
    	for(var j = i+1; j < arr.length ; j++)
    	{
    		if(arr[i] === arr[j]){
    			arr.splice(j,1);
    		}
    	}
    }
    return arr;
}
//方法2  对比该位置的数组项如果没有与后面的数组项相同则加入到新数组，否则跳过该数组项
function uniqArray2(arr) {
	var newarr = [];
	for(var i= 0 ; i < arr.length; i++){
		for(var j = i+1; j < arr.length+1 ; j++){
			if (arr[i] == arr[j]) {
				j = false;
				break;
			}
		}
		if(j) {newarr.push(a[i]);}
	}
	return newarr;
}
//方法3 用indexOf
function uniqArray3(arr){
	var newarr = [], i;
	for(i = 0; i < arr.length; i++){
		if(newarr.indexOf(arr[i]) == -1){
			newarr.push(arr[i]);
		}
	}
	return newarr;
}


// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var result;
    for(var i = 0; i < str.length; i++){
    	if (str[i] !== " "&& str[i] !=="\t") {break;};
    }
    for(var j = str.length-1; j > 0; j--){
    	if (str[j] !== " "&& str[j] !=="\t") {break;};
    }
    return result = str.slice(i,j+1);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
	var reg = /^\s+|\s+$/g;
	var match = str.replace(reg,"");
	return match;
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var n = 0;
	for (pro in obj){
		n++;
	}
	return n;
}



function isEmail(emailStr) {
    var re = /^[0-9a-z]([0-9a-z]*[_-]?[0-9a-z]+)*@[0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?$/i; 
    if (re.test(emailStr)){
    	return true;
    }
    else{
    	return "请输入正确的email地址";
    }
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var re=/^1\d{10}$/;
    if (re.test(phone)){
    	return true;
    }
    else{
    	return "请输入正确的手机地址";
    }
}

function output(p, n, c, e) {
		p.removeChild(e);
		n ? p.insertBefore(c, n) : p.appendChild(c);
}

 
function output(p, n, c, e) {
	return (function(p, n, c, e) {
		return function(){
		p.removeChild(e);
		n ? p.insertBefore(c, n) : p.appendChild(c);
		}
	}(p, n, c, e))
}

//3.DOM
//检测element中是否已经存在className
function isHasClass(element, className) {
	var reg = new RegExp(("(\\s|^)" + className + "(\\s|$)"));
	return element.className.match(reg);
}

//添加element中的样式newClassName
function addClass(element, newClassName) {
	if(!isHasClass(element, newClassName)){
		if(element.className){
			element.className += " " +newClassName;
		}else{
			element.className = newClassName;
		}
	}
}
//用html5的属性 classList.add()
function addClass2(element, newClassName) {
	if(!isHasClass(element, newClassName)){
		element.classList.add(newClassName);
	}
}


// 移除element中的样式oldClassName
//将类名转化为数组，再删除有oldClassName的数组项
function removeClass(element, oldClassName) {
    if(isHasClass(element, oldClassName)){
       var classArray = element.className.split(/\s/);
       var pos;
       for (var i = 0,len = classArray.length; i < len ; i++){
            if(classArray[i] == oldClassName){
                pos = i;
                break;
            }
       }
       classArray.splice(pos,1);
       element.className = classArray.join(" ");
    }
}
//用html5的属性 classList.remove()
function removeClass2(element, oldClassName) {
	if(isHasClass(element, oldClassName)){
    	element.classList.remove(oldClassName);
    }
}

//用正则表达式，可是若匹配到第一个或最后一个类名会有多余空格
function removeClass3(element, oldClassName){
	if(isHasClass(element, oldClassName)){
		var reg = new RegExp("(\\s|^)" + oldClassName + "(\\s|$)");
		//若是匹配变量要用构造函数的方法才行，不然会把变量当初一个字符串匹配
	    element.className = element.className.replace(reg, " ");
	}
}


// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	var position = {};
    position.x = element.getBoundingClientRect().left + document.documentElement.scrollLeft;
    position.y = element.getBoundingClientRect().top + document.documentElement.scrollTop;
    return position;
}


// 实现一个简单的Query
function getClass(oClass, oParent){
	if(oParent.getElementsByClassName(oClass)){
		return oParent.getElementsByClassName(oClass);
	}
	else{
		var reg = new RegExp("(^|\\s)" + oClass + "\\s|&", "i"),
			classNode = [],
			tags = oParent.getElementsByTagName("*");
			for(var i = 0, len = tags.length; i < len; i++){
				if(tags[i].className.match(reg)){
					classNode.push(tags[i]);
				}
			}
		return classNode;
	}
}
function $(selector, oParent) {
	var oParent = oParent?oParent:document;
	var element;//返回的元素标签
	if (selector.indexOf(" ") == -1){
		switch (selector[0]){
			case "#":
				element = oParent.getElementById(selector.slice(1));
				break;
			case ".":
				element = getClass(selector.slice(1), oParent)[0];
				break;
			case "[":
				var attr = selector.replace(/\[|\]/g, "");
				var tags = oParent.getElementsByTagName("*");
				var len = tags.length;
				if (attr.indexOf("=") === -1){
					for (var i = 0; i < len; i++){
						if(tags[i].getAttribute(attr)){
							element = tags[i];
							break;
						}
					}
				}else{
					/* 
					//用正则表达式1
					var reg = /\=/;
					if (reg.test(attr)){
						var oAttr = RegExp.leftContext;//匹配字符串的左边内容
						var value = RegExp.rightContext//匹配字符串的右边内容
					}
					for (var i = 0,; i < len; i++){
						if(tags[i].getAttribute(oAttr) === value)){
							element = tags[i];
							break;
						}
					}
					
					//用正则表达式1
					var reg = /[\w-]+(?=\=)|\=|['"]/g,
					var value = attr.replace(reg,""),
						oAttr = attr.match(reg)[0];
					for (var i = 0,; i < len; i++){
						if(tags[i].getAttribute(oAttr) === value)){
							element = tags[i];
							break;
						}
					}
					*/
					var index = attr.indexOf("=")
					for (var i = 0; i < len; i++){
						if(tags[i].getAttribute(attr.slice(0 , index)) === attr.slice(index+1)){
							element = tags[i];
							break;
						}
					}
				}
				break;
			default:
			element = oParent.getElementsByTagName(selector)[0];
			}
		return element;
	}else{
		var obj = selector.split(/\s+/),
			parent = obj[0],
			child  = obj[1];
		return arguments.callee(child,arguments.callee(parent));
	}
}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象

//4.事件
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener){
    	element.addEventListener(event, listener, false);
    }else if(element.attach){
    	element.attach("on" + event, listener);
    }else{
    	element["on" + event] = listener;
    }
}
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
     if (element.removeEventListener){
    	element.removeEventListener(event, listener, false);
    }else if(element.detach){
    	element.detach("on" + event, listener);
    }else{
    	element["on" + event] = null;
    }
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keydown', function(event){
    	var event = event || window.event;
    	if(event.keyCode == "13"){
    		return listener(event);
    	}
    })
}

$.on = function (element, event, listener){
	return addEvent(element, event, listener);
}
$.un = function(element, event, listener){
	return removeEvent(element, event, listener);
}
$.click = function(element, listener){
	return addClickEvent(element, listener);
}
$.enter = function(element, listener){
	return addEnterEvent(element, listener);
}
function enterTest(e){
	alert(e.target.value);
}
$.enter($("#enter"), enterTest);

// 先简单一些,用事件代理给目标元素添加监听器
function delegateEvent(element, tag, eventName, listener) {
    return addEvent(element, eventName, function(ev){
    	var ev = ev||window.event;
    	var oTag = ev.target || ev.srcElement;
    	if( oTag.nodeName.toLowerCase() === tag.toLowerCase()){
    		listener.call(oTag);
    	} 
    })
}

// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
function clickHandle(){
	console.log(event.target);
}

//函数里面一堆$看着晕，那么接下来把我们的事件函数做如下封装改变：
//主要是在选择要监听的元素添加$来指定元素。
$.on = function (selector, tag, event, listener){
    return addEvent($(selector), event, listener);
}

$.click = function (selector, listener) {
    return addEvent($(selector), 'click', listener);
}

$.un = function (selector, event, listener) {
    return removeEvent($(selector), event, listener);
}

$.delegate = function (selector, tag, event, listener) {
    delegateEvent($(selector), tag, event, listener)
}

function logListener(e){
	alert(e.target);
}



//5 BOM
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = navigator.userAgent;
    if(/MSIE ([^;]+)/.test(ua)){
    	return RegExp["$1"];
    }else{
    	return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + expiredays);
    document.cookie = cookieName + "=" + cookieValue + ";expires=" + oDate;
}

// 获取cookie值
function getCookie(cookieName) {
    var arr = document.cookie.split(";"),
    	len = arr.length;
    for(var i = 0; i < len; i++){
    	var arr2 = arr[i].split("=");
    	if(arr2[0] = cookieName){
    		return arr2[1];
    	}
    }
    return "";
}

function removeCookie(cookieName){
	setCookie(cookieName, null, -1);
}

// 
function ajax(url, options) {
    var xhr;
    if(window.XMLHTTPRequest){
        xhr = new XMLHTTPRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");//IE6以下 获得XHLHTTPRequest对象
    }
    var type = options.type;
    var rSuccess = options.onsuccess;
    var rFail = options.onfail;
    var content = options.data?options.data:null;
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200 || xhr.status ==304){
                rSuccess(xhr.responseText);
            } else {
                if(rFail){
                    rFail;
                }
            }
        }
    }
    if(type.toLowerCase() == "post"){
        xhr.open("post", url, true)
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(content);
    } else{
        xhr.open("get", url, true)
        xhr.send();
    }
    
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);