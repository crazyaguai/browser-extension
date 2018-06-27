console.log('注入inject.js')

// 接收contentscript消息
window.addEventListener('message', function(e) {
    if (e.data.src === "content" && e.data.dst === "inject") {
        console.log('接收contentscript消息')
        console.log(e.data)
    }
})

//向content发消息
function message2content(data){
    window.postMessage({
        "src": "inject",
        "dst": "content",
        "data": data
    }, "*");
}