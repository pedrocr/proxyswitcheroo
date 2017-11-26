var currentProxy = false;
var proxyScriptURL = "pac.js";
const noProxy = [
  {
    type: "direct",
    host: "localhost",
    port: 6535,
  }
];

function onError(error) {
  console.log(`Error: ${error}`);
}

// Install the PAC file so we can control the proxying ourselves
var register = browser.proxy.register(proxyScriptURL);
// Log any messages from the proxy.
register.then(browser.runtime.onMessage.addListener((message, sender) => {
  if (sender.url === browser.extension.getURL(proxyScriptURL)) {
    console.log(message);
  }
}));

function toggleProxy() {
  currentProxy = !currentProxy;
  if (currentProxy) {
    var getting = browser.storage.local.get("proxySwitcherooConfig");
    getting.then(setProxy, onError);
  } else {
    browser.runtime.sendMessage(noProxy, {toProxyScript: true});
  }
  refresh();
}

function setProxy(config) {
  const someProxy = [
    {
      type: config.proxySwitcherooConfig.type,
      host: config.proxySwitcherooConfig.host,
      port: config.proxySwitcherooConfig.port,
      proxyDNS: config.proxySwitcherooConfig.proxyDNS
    }
  ];

  browser.runtime.sendMessage(someProxy, {toProxyScript: true});
}

function refresh() {
  var querying = browser.tabs.query({});
  querying.then(doTabsUpdate);
}

function doTabsUpdate(tabs) {
  for (let tab in tabs) {
    browser.browserAction.setIcon({
      path: currentProxy ? "icons/globe.png" : "icons/globe-disabled.png",
      tabId: tab.id
    });

    browser.browserAction.setTitle({
      // Screen readers can see the title
      title: currentProxy ? 'Proxy' : 'No Proxy',
      tabId: tab.id
    });
  }
}

browser.browserAction.onClicked.addListener(toggleProxy);

// update when the extension loads initially
refresh();
