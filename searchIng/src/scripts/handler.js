//import {searchBarUI} from "./searchBarUI.js";
let handler = null; 

class Handler {

    constructor() {
        console.log("Intializing handler");
        chrome.runtime.onMessage.addListener(this.listen);
        this.dataPath = "../../data.json";
        this.dataFiltered = {}
        this.executing = false;
        this.searhBarUI = {}

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

    listen(request, sender, sendResponse) {
        console.log("request:",request,"from:",sender);

        // if request init -> call search
        if ('initialize' in request && !this.executing){
            // this.sendMessage({received:true});
            console.log("Url valid, starting to load search bar");
            this.init();
            sendResponse({ request: 'Initializing searchBarUI' });
        }

        // if message unload -> call unload and clear dataFiltered
        if ('unload' in request){
            this.unload();
        }
    }

    sendMessage(request) {
        console.log("Sending the following request: ", request);
        chrome.runtime.sendMessage(request, (response) => {});
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
    prompt(){
        // Add bubble to the top of the page.
        this.searchBarUI = document.createElement('div');
        this.searchBarUI.setAttribute('class', 'search_bar');
        document.body.appendChild(this.searchBarUI);

        // Lets listen to mouseup DOM events.
        document.addEventListener('mouseup', function (e) {
            var selection = window.getSelection().toString();
            if (selection.length > 0) {
                renderBubble(e.clientX, e.clientY, selection);
            }
        }, false);

        // Close the bubble when we click on the screen.
            document.addEventListener('mousedown', function (e) {
                bubbleDOM.style.visibility = 'hidden';
            }, false);

        // Move that bubble to the appropriate location.
            function renderBubble(mouseX, mouseY, selection) {
                bubbleDOM.innerHTML = selection;
                bubbleDOM.style.top = mouseY + 'px';
                bubbleDOM.style.left = mouseX + 'px';
                bubbleDOM.style.visibility = 'visible';
            }
    }
    unload() {
        // unload searchCache
        this.searchCache = {};
        this.executing = false;
    }

}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.data.destination=="handler"){
            if (request.data.action=="prompt_search_bar"){
                if (!handler){
                    handler = new Handler();
                    handler.init(); 
                } else {
                    handler. 
                }
            }
        }
    }
);

