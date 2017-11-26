var currentProxy = false;

function toggleProxy() {
  currentProxy = !currentProxy;
  if (currentProxy) {
    browser.proxy.register("pac.js");
  } else {
    browser.proxy.unregister();
  }
  refresh();
}

function refresh() {
  var querying = browser.tabs.query({});
  querying.then(doTabsUpdate);
}

function doTabsUpdate(tabs) {
  for (let tab in tabs) {
    browser.browserAction.setIcon({
      path: currentProxy ? {
        19: "icons/globe.png",
        38: "icons/globe.png"
      } : {
        19: "icons/globe-disabled.png",
        38: "icons/globe-disabled.png"
      },
      tabId: tab.id
    });

    browser.browserAction.setTitle({
      // Screen readers can see the title
      title: currentProxy ? 'No Proxy' : 'Proxy',
      tabId: tab.id
    });
  }
}

browser.browserAction.onClicked.addListener(toggleProxy);

// update when the extension loads initially
refresh();

