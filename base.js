// JavaScript Document
addDOMLoadEvent(function(){
	colorTab("oTable td");
});
function colorTab(){
	//console.log(arguments.length);
	var myId = getid(arguments[0]);
	var tag = getTag(arguments[0]);
	var oldClass;
	for(var i=0;i<myId.rows.length;i++){
		i%2==1?myId.rows[i].className="over":'';
	}
	myId.onmouseover = function(ev){
		var target = delegate(ev);
		if(lowerCase(target,"td")){
			oldClass = target.parentNode.className;
			target.parentNode.className = "over";
		}
	}
	myId.onmouseout = function(ev){
		var t = delegate(ev);
		if(lowerCase(t,"td")){
			t.parentNode.className = oldClass;
		}
	}
}
function delegate(e){//事件捕捉
	var e = e || window.event;
	return e.target || e.srcElement;
}
function lowerCase(e,tag){//判断事件捕获标签
	return e.nodeName.toLowerCase() == tag;
}
function getid(s){//获取id
	var m = s.split(" ")[0],n;
	m.slice(0,1)=="#"?n=m.slice(1):n=m;
	return document.getElementById(n);
}
function getTag(s){//获取标签
	return s.split(" ")[0].slice(1);
}
function addDOMLoadEvent(func) {
    if (!window.__load_events) {
       var init = function () {
           // quit if this function has already been called
           if (arguments.callee.done) return;
           // flag this function so we don't do the same thing twice
           arguments.callee.done = true;
           // kill the timer
           if (window.__load_timer) {
               clearInterval(window.__load_timer);
               window.__load_timer = null;
           }
           // execute each function in the stack in the order they were added
           for (var i=0;i < window.__load_events.length;i++) {
              window.__load_events[i]();
           }
           window.__load_events = null;
       };
       // for Mozilla/Opera9
       if (document.addEventListener) {
           document.addEventListener("DOMContentLoaded", init, false);
       }
      
       // for Internet Explorer
       /*@cc_on @*/
       /*@if (@_win32)
           document.write("<scr"+"ipt id=__ie_onload defer src=//0><\/scr"+"ipt>");
           var script = document.getElementById("__ie_onload");
           script.onreadystatechange = function() {
               if (this.readyState == "complete") {
                   init(); // call the onload handler
               }
           };
       /*@end @*/
      
       // for Safari
       if (/WebKit/i.test(navigator.userAgent)) { // sniff
           window.__load_timer = setInterval(function() {
               if (/loaded|complete/.test(document.readyState)) {
                   init(); // call the onload handler
               }
           }, 10);
       }
       // for other browsers
       window.onload = init;
       // create event function stack
       window.__load_events = [];
    }
    // add function to event stack
    window.__load_events.push(func);
}