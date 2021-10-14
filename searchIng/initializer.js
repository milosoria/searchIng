import isValidUrl from "./lib/utils.js";
import Handler from "./src/scripts/handler.js";

// Main handler for all operations and options
chrome.commands.onCommand.addListener((command) => {
    console.log(`Executing the following command: ${command}`);

    const isValid = isValidUrl().then((isValid)=>{
        return isValid
    })

    if (command == "prompt_search_bar" && isValid) {
       chrome.runtime.sendMessage({ initialize: true });
    } else { 
        //TODO: this shouldnt be an alert
        alert("This is not Siding");
    } 
});

// TODO: Messages wont trigger onMessage event cause the handler and the sender are in the same context
let handler = new Handler();
