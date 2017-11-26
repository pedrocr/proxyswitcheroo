const defType = "socks";
const defHost = "localhost";
const defPort = 9999;
const defProxyDNS = true;

function onError(error) {
  console.log(`Error: ${error}`);
}

function getConfig() {
  return browser.storage.local.get({
    proxySwitcherooConfig: {
      type: defType,
      host: defHost,
      port: defPort,
      proxyDNS: defProxyDNS,
    }
  });
}
