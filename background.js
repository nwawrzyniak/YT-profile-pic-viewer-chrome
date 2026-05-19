chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(
        tab.id,
        {}
    ).then(response => {}).catch(error => {
        console.error(`Error: ${error}`)
    })
});
