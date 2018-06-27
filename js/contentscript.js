console.log('插件注入contentscript')

//注入inject.js
function setupInjection(file) {
    var s = document.createElement('script');
    s.src = chrome.extension.getURL(file);
    var container = document.head || document.documentElement
    container.insertBefore(s, container.children[0])
    s.onload = function () {
        s.remove();
    };
}

var file = 'js/inject.js'
setupInjection(file);

//创建向bg发消息的连接(长连接)
var port = chrome.runtime.connect({name: "contentscript"});

//向bg页发消息
port.postMessage({src: "contentScript", dst: "background", data: '123'});

//接收bg页面消息向inject页面发消息
port.onMessage.addListener(function (msg) {
    console.log('接收bg页面消息')
    console.log(msg)
    window.postMessage({
        "src": "content",
        "dst": "inject",
        "data": msg
    }, "*");
});

// 接收inject消息
window.addEventListener('message', function (e) {
    if (e.data.src === "inject" && e.data.dst === "content") {
        console.log('接收inject消息')
        console.log(e.data)
    }
})

//向inject页面发消息
function message2inject(data) {
    window.postMessage({
        "src": "content",
        "dst": "inject",
        "data": data
    }, "*");
}

//接收bg主动发来的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
    sendResponse('收到，返回消息！');
});

//短连接发消息
setTimeout(()=>{
    chrome.runtime.sendMessage({data:8888888888888},(res)=>{
        console.log(res)
    })
},4000)