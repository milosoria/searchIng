//import {searchBarUI} from "./searchBarUI.js";

let handler = null;

class Handler {

    constructor() {
        console.log("Intializing handler");
        chrome.runtime.onMessage.addListener(this.listen);
        this.dataPath = "../../data.json";
        this.dataFiltered = {};
        this.executing = false;
        this.searhBarUI = null;

        try {
            const url = chrome.runtime.getURL(this.dataPath);
            console.log("URL", url);
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    this.searchData = data;
                });
        } catch (error) {
            this.searchData = {};
            console.log("ERROR IN JSON PARSING", error);
        }
        this.createIframe();
    }

    createIframe(){

        const styleSheet = DomUtils.createElement("style");
        styleSheet.type = "text/css";
        // Default to everything hidden while the stylesheet loads.
        styleSheet.innerHTML = "iframe {display: none;}";
        this.iframeElement = document.createElement("iframe");
        Object.assign(this.iframeElement, {
            className,
            seamless: "seamless"
        });

        const shadowWrapper = document.createElement("div");

        if (shadowWrapper.attachShadow)
            this.shadowDOM = shadowWrapper.attachShadow({mode: "open"});
        else
            this.shadowDOM = shadowWrapper;

        this.shadowDOM.appendChild(styleSheet);
        this.shadowDOM.appendChild(this.iframeElement);
        this.iframeElement.classList.add("searchBarUIComponentHidden");
    }

    listen(request, sender, sendResponse) {
        console.log("request:", request, "from:", sender);

        switch(request){
            // if request init -> call search
            case "initialize" in request && !this.executing:
                // this.sendMessage({received:true});
                console.log("Url valid, starting to load search bar");
                sendResponse({ request: "Initializing searchBarUI" });
            

            // if message unload -> call unload and clear dataFiltered
            case "unload" in request:
                this.unload();
        }   
    }

    sendMessage(action, type, message) {
        data.action = action;
        data.type = type;
        data.message = message;
        chrome.runtime.sendMessage({
            receiver: "handler",
            data: data,
            destination: "background",
            function(response) {},
        });
    }

    search(input) {
        // this has to search on key stroke for link that match, showing at most 5 best matches results
    }

    prompt() {

        this.iframeElement.classList.remove("searchBarUIComponentHidden");
        this.iframeElement.classList.add("searchBarUIComponentVisible");
        
        if (!this.iframeElement.searchBarUI) {
            // Add search Bar Ui to screen, prompt over the middle of the y axis
            this.iframeElement.searchBarUI = this.iframeElement.createElement("div");
            this.iframeElement.searchBarUI.setAttribute("class", "search_bar");
            this.iframeElement.searchBarUI.addEventListener("onfocusout", function (_) {
                // Close in case focus is lost
                this.close();
            });

            // Add event listener for enter
            this.iframeElement.searchBarUI.addEventListener(
                "keypress",
                function (e) {
                    if (e.keyCode == 13) {
                        // get which link was selected and redirect to it
                        // sends message to background, so it redirects the page

                        this.sendMessage("redirect to url", "redirect", "");
                    } else if (e.keyCode == 27) {
                        // escape key is pressed, then we close the prompt

                        this.close();
                    }
                },
                false
            );
        }
    }

    close() {
        // unload searchCache
        this.iframeElement.classList.add("searchBarUIComponentHidden");
        this.searchCache = {};
        this.executing = false;
    }
}

chrome.runtime.onMessage.addListener(function (request, _, _) {
    console.log(request);
    if (request.data.destination == "handler") {
        if (request.data.action == "prompt_search_bar") {
            if (!handler) {
                handler = new Handler();
            }
            handler.prompt();
        }
    }
});
