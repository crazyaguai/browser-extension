//与bg传消息(长连接)
var port = chrome.runtime.connect({name: "popup"});
port.onMessage.addListener(function (msg) {
    console.log('popup')
    console.log(msg)
})
function message2Bg(data) {
    port.postMessage({src: "popup", dst: "background", data: data});
}
document.getElementById('message2bg').addEventListener('click', () => {
    console.log('发消息给bg')
    message2Bg({num: '123456789'})
})



//调用bg的方法
var bg = chrome.extension.getBackgroundPage();
bg.FUN(1111)

//接收bg主动发来的消息(短连接)
chrome.runtime.onMessage.addListener(  function(request, sender, sendRespons ){
    console.log(request)
    sendRespons('收到，返回消息！');
});