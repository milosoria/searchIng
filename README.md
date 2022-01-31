# searchIng

Simple extension that pops up a search bar to navigate through Siding pages.
Although it may be usable for other pages extending the scrapping system, so it scraps all a tags inside a page and generates data.json dinamically. 
If it works, it would make navigation, inside a page with too much info, easier and faster.


1. Loading of the links data to the Handler class, triggered by message (chrome.runtime) sent after:

* The popup button gets clicked:

- [ ] addeventlistener and send the message to the Handler class

* Or via shortcut command:

- [ ] addeventlistener (backgroundscript) and send the message to the Handler class

2. Once the Handler class finishes loading the data, it sends another message to the UI so it renders the searchBarUI
        
- [ ] Handler class send message after finishing loading

3. When the searchBarUI receives input (onChange event), it sends a message to the Handler so it searches progressively through the links and their text info

- [ ] addeventlistener for onChange event or onInput?? so it triggers a the messaging
- [ ] Handler class creates a new search and init a searchCache

4. If the user finds a link associated with its input, then the searchBarUI sends a message to the Handler so it redirects to the link selected and inmediately closes

- [ ] addeventlistener for navigation on the searchBarUI and quitting with mapped keys
- [ ] make it fuckn fancy

5. Then the Handler clears its search cache and starts listening again for another message

- [ ] Clear Handler cache on quit or on un/succesful search and make the backgroundscript start listening again for searchBarUI triggers

### Maps

- ESC has to exit the UI and clear Handler cache
- Enter must select the focused option (in case none was found, then it should act as ESC)
- Tab and S-Tab/Arrow Keys must serve as navigation through the links
