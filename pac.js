var proxySpecification = [
  {
    type: "direct",
    host: "localhost",
    port: 6535,
  }
];

function FindProxyForURL(url, host) {
  return proxySpecification;
}

browser.runtime.onMessage.addListener((message) => {
//  browser.runtime.sendMessage("Setting proxy: " + message[0].type + 
//                                            " " + message[0].host +
//                                            " " + message[0].port +
//                                            " " + message[0].proxyDNS);

  proxySpecification = message;
});
