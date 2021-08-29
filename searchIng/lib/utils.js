export default async function isUrlValid() {
    return await chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        const url = tabs[0].url;
        if (url.indexOf("https://intrawww.ing.puc.cl/siding/index.phtml") > -1) {
            return true
        } else {
            return false
        }
    });
    
}
