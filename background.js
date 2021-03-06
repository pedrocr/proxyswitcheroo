var currentProxy = false;

function toggleProxy() {
  currentProxy = !currentProxy;
  setEnabled(currentProxy);
  getConfig().then(setProxy, onError);
}

function setProxy(config) {
  var settings = browser.proxy.settings.get({});
  settings.then((got) => {
    var proxySettings = got.value;
    delete proxySettings.respectBeConservative;
    if (currentProxy) {
      proxySettings.proxyType = config.proxySwitcherooConfig.onType;
      var newsetting = browser.proxy.settings.set({value: proxySettings});
      newsetting.then(refresh());
    } else {
      var clearsetting = browser.proxy.settings.clear({});
      clearsetting.then(refresh());
    }
  });
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
  currentProxy = enabled.proxySwitcherooEnabled;
  getConfig().then(setProxy, onError);
}

// Make sure the icon is correct initialy
refresh();

// Set the initial state of the proxy
getEnabled().then(initialEnable);

// Respond to clicks
browser.browserAction.onClicked.addListener(toggleProxy);
