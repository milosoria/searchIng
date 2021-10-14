export default class Handler {

    constructor() {
        chrome.runtime.onMessage.addListener(this.listen);
        this.dataPath = "../../data.json";
        this.dataFiltered = {}
        this.executing = false;

        try {
            const url = chrome.runtime.getURL(this.dataPath);
            console.log("URL",url);
            fetch(url)
                .then((response) =>response.json())
                .then((data)=>{
                    this.searchData = data;
                })
        } catch (error) {

            this.searchData = {};
            console.log("ERROR IN JSON PARSING", error);

        }

    }

    listen(message, sender, sendResponse) {
        console.log("Message:",message,"from:",sender);

        // if message init -> call search
        if ('initialize' in message && !this.executing){
            // this.sendMessage({received:true});
            console.log("Url valid, starting to load search bar");
            this.init();
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

    init() {
        // change this after unload is called
        console.log("ISTHISHAPPENING");
        this.executing = true;
        let iframe = document.createElement('iframe');
        iframe.setAttribute("src", "https://www.facebook.com/plugins/like.php?href=http://allofrgb.blogspot.in/");
        iframe.setAttribute("style", "border:none; width:150px; height:30px");
        iframe.setAttribute("scrolling", "no");
        iframe.setAttribute("frameborder", "0");
        document.body.appendChild(iframe);
        console.log("APPENDING iframe to document", iframe);
        // add event listener and call search
        // TODO: closee
    }

    search(input){
        // search in searchCache depending on the input, should this use regex or pure js
        // if no key in this.dataName matches the input then send a message notifying the searchBarUI
    }

    unload() {
        // unload searchCache
        this.searchCache = {};
        this.executing = false;
    }

}
