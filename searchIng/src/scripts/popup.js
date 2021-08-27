//In order to start the rendering with this call, internal message should be sent to UI renderer, or simply triggered by a shortcut handled by a background service_worker
const bttnMain = document.getElementById("bttnMain");

bttnMain.onClick((event)=>{
        chrome.runtime.sendMessage({init: true}, (response)=>{

        })
})
