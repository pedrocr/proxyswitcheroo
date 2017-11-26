var currentProxy = false;

function toggleProxy() {
  currentProxy = !currentProxy;
  updateActiveTab();
  console.log("Switched Proxy!");
}

browser.browserAction.onClicked.addListener(toggleProxy);

function updateActiveTab(tabs) {
  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      browser.browserAction.setIcon({
        path: currentProxy ? {
          19: "icons/globe.png",
          38: "icons/globe.png"
        } : {
          19: "icons/globe-disabled.png",
          38: "icons/globe-disabled.png"
        },
        tabId: currentTab.id
      });
      browser.browserAction.setTitle({
        // Screen readers can see the title
        title: currentBookmark ? 'No Proxy' : 'Proxy',
        tabId: currentTab.id
      });
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);

// update when the extension loads initially
updateActiveTab();

