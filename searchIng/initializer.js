import isValidUrl from "./lib/utils.js";
// import Handler from "./src/scripts/handler.js";
// import {Handler} from "./src/scripts/handler.js";
// TODO: how am i supposed tto do this

chrome.commands.onCommand.addListener((command) => {
    console.log(`Executing the following command: ${command}`);

    const isValid = isValidUrl().then((isValid)=>{
        return isValid
    })

    if (command == "prompt_search_bar" && isValid) {
        chrome.runtime.sendMessage({ initialize: true }, (response) => {});
    } else {
        alert("This is not Siding");
    }
});


// const handler = new Handler();
