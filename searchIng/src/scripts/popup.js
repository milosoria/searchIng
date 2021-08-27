//In order to start the rendering with this call,
//internal message should be sent to UI renderer, or simply triggered by a shortcut handled by a background service_worker
const {isValidUrl} = require('../lib/utils.js');

const bttnMain = document.getElementById("bttnMain");

bttnMain.onClick((event) => {
        if (isValidUrl()) {
                chrome.runtime.sendMessage({ initialize: true }, (response) => {});
        } else {
                alert('This is not Siding UWU')
        }
});
