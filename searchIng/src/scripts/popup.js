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

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "prompt_search_bar"}, function(response) {});  
        });

    } else {
        alert("This is not Siding");
    }
});
