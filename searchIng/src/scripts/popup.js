//In order to start the rendering with this call,
//internal message should be sent to UI renderer, or simply triggered by a shortcut handled by a background service_worker
import isValidUrl from "../../lib/utils.js";

const mainBttn = document.getElementById("mainBttn");

mainBttn.addEventListener("click", (event) => {
    const isValid = isValidUrl().then((isValid)=>{
        return isValid
    })
    if (isValid) {
        console.log("Url is valid, starting to load search bar...");
        chrome.runtime.sendMessage({ initialize: true }, (response) => {});
    } else {
        alert("This is not Siding");
    }
});
