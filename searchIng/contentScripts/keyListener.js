const {isValidUrl} = require('../lib/utils.js');

function doKeyPress(e){
        if (e.key == '/' && isValidUrl()){ 
                chrome.runtime.sendMessage({ initialize: true }, (response) => {});
        }else {
                alert('This is not Siding UWU')
        }

}

if (window == top) {
        window.addEventListener('keyup', doKeyPress, false); //add the keyboard handler
}

