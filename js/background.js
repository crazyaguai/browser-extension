console.log('background')

//右侧图标提示信息
chrome.browserAction.setBadgeText({text: 'tips'});
chrome.browserAction.setBadgeBackgroundColor({color: '#6472FF'});

//右键菜单
chrome.contextMenus.create({
    title: "测试右键菜单",
    onclick: function () {
        alert('右键菜单');
        // chrome.notifications.create(null, {
        //     type: 'basic',
        //     iconUrl: 'asset/img/icon.png',
        //     title: '这是标题',
        //     message: '您刚才点击了自定义右键菜单！'
        // });
    }
});

//bg接收来自contentscript和popup的消息
chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (msg.src === 'contentScript') {

        } else if (msg.src === 'popup') {

        }
    })
})


//bg或者popup主动发消息给content
function sendMessageToContentScript(data, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, data, function (response) {
            if (callback) callback(response);
        });
    });
}

// sendMessageToContentScript({cmd: 'test', value: '你好，我是popup！'}, function (response) {
//     console.log('来自content的回复：' + response);
// });

//调用popup的方法(popup打开前提下)
var views = chrome.extension.getViews({type:'popup'});
if(views.length > 0) {
    console.log(views[0].location.href);
}

function FUN(data) {
    console.log(data)
}



//bg主动发消息给popup(短连接)
setTimeout(()=>{
    chrome.runtime.sendMessage({data:444555666},(res)=>{
        console.log(res)
    })
},4000)


