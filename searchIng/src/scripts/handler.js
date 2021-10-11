export default class Handler {

    constructor() {
        // Handler will listen to messages sent by the event emitter
        chrome.runtime.onMessage.addListener(this.listen);
        this.dataName = "../../data.json";
        this.dataFiltered = {}
        try {

            const url = chrome.runtime.getURL(this.dataPath);
            console.log("URL",url);
            fetch(url)
                .then((response) => response.json()) //assuming file contains json
                .then((json) => {
                    this.searchData = JSON.parse(json);
                    console.log(this.searchData);
                });

        } catch (error) {

            this.searchData = {};
            console.log("Error in json parsing", error);

        }

    }

    listen(message, sender, sendResponse) {
        console.log("Receiving message from: ", sender);
        console.log(message);

        // if message init -> call search
        if ('init' in message){
            this.search();
        }

        // if message unload -> call unload and clear dataFiltered
        if ('unload' in message){
            this.unload();
        }
    }

    sendMessage(message) {
        console.log("Sending the following message: ", message);
        chrome.runtime.sendMessage(message, (response) => {});
    }

    search(input) {
        // TODO: closee
        // search in searchCache depending on the input, should this use regex or pure js
        // if no key in this.dataName matches the input then send a message notifying the searchBarUI
    }

    unload() {
        // unload searchCache
        this.searchCache = {};
    }

}
