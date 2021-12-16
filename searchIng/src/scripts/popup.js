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
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            data.tab.id = tabs[0].id;
            data.action = "prompt searchBar";
            data.type = "prompt_search_bar";
            chrome.runtime.sendMessage({
                receiver: request.destination,
                data: data,
                function(response) {},
            });
        });
    } else {
        data.action = "prompt error";
        data.type = "error";
        data.message = "This Url is not supported yet!";
        chrome.runtime.sendMessage({
            receiver: request.destination,
            data: data,
            function(response) {},
        });
    }
});
