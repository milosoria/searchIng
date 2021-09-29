import isValidUrl from "./lib/utils.js";
import Handler from "./src/scripts/handler.js";

chrome.commands.onCommand.addListener((command) => {
    console.log(`Executing the following command: ${command}`);

    const isValid = isValidUrl().then((isValid)=>{
        return isValid
    })

    if (command == "prompt_search_bar" && isValid) {
        console.log("Url valid, starting to load search bar");
        chrome.runtime.sendMessage({ initialize: true }, (response) => {});
    } else { 
        alert("This is not Siding");
    } 
});

// Main handler for all operations and options
const handler = new Handler();
