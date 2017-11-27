var currentProxy = false;
var proxyScriptURL = "pac.js";
const noProxy = [
  {
    type: "direct",
    host: "localhost",
    port: 6535,
  }
];

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
  setEnabled(currentProxy);
  if (currentProxy) {
    getConfig().then(setProxy, onError);
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
  browser.browserAction.setIcon({
    path: currentProxy ? "icons/globe.png" : "icons/globe-disabled.png",
  });

  browser.browserAction.setTitle({
    // Screen readers can see the title
    title: currentProxy ? 'Proxy' : 'No Proxy',
  });
}

function initialEnable(enabled) {
  if (enabled.proxySwitcherooEnabled != currentProxy) {
    toggleProxy();
  }
}

// Make sure the icon is correct initialy
refresh();

// Enable the proxy initially if set
getEnabled().then(initialEnable);

// Respond to clicks
browser.browserAction.onClicked.addListener(toggleProxy);
