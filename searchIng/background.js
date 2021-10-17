import isValidUrl from "./lib/utils.js";

// Main handler for all operations and options
chrome.commands.onCommand.addListener((command) => {
    console.log(`Executing the following command: ${command}`);

    const isValid = isValidUrl().then((isValid)=>{
        return isValid
    })

    if (command == "prompt_search_bar" && isValid) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {action: "prompt_search_bar"}, function(response) {});  
        });
    } else { 
        //TODO: this shouldnt be an alert
        alert("This is not Siding");
    } 
});
