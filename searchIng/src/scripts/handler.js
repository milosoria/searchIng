import * as fs from 'fs';
import * as path from 'path';

export default class Handler {

        constructor() {
                this.dataName = path.join(path.resolve("./"), "data.json");
                this.dataFiltered = {}
                try {
                        this.searchData = JSON.parse(fs.readFile(this.dataName));
                } catch (error) {
                        this.searchData = {};
                        console.log("Error in json parsing", error);
                }
                chrome.runtime.onMessage.addListener(this.listen);
        }

        sendMessage(message) {
                console.log("Sending the following message: ", message);
                chrome.runtime.sendMessage(message, (response) => {});
        }

        search(input) {
                // search in searchCache depending on the input, should this use regex or pure js
                // if no key in this.dataName matches the input then send a message notifying the searchBarUI
        }

        unload() {
                // unload searchCache
                this.searchCache = {};
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
}
