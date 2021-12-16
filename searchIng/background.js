import isValidUrl from "./lib/utils.js";

// Main handler for all operations and options
chrome.commands.onCommand.addListener((command) => {
    console.log(`Executing the following command: ${command}`);

    const isValid = isValidUrl().then((isValid) => {
        return isValid;
    });

    data = {};
    if (command == "prompt_search_bar" && isValid) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            data.tab.id = tabs[0].id;
            data.action = "prompt searchBar";
            data.type = "prompt_search_bar";
            chrome.runtime.sendMessage({
                receiver: request.destination,
                data: data,
                destination:"handler",
                function(response) {},
            });
        });
    } else {
        data.action = "prompt error";
        data.type = "error";
        data.message = "This Url is not supported yet!";
        chrome.runtime.sendMessage({
            receiver: request.data.destination,
            data: data,
            destination: "handler",
            function(response) {},
        });
    }
});

chrome.commands.onMessage.addListener((request, sender, sendResponse) => {
    console.log(`Message received, from ${sender}`);
    if (request.receiver == "background") {
        if (request.data.type == "redirect_to_url") {
            console.log(`Message received: ${request.data}`);
            chrome.tabs.update(sender.tab.id, {url: request.data.redirect});
            sendResponse({ received_by: "Background Listener" });
        }
    }
});
