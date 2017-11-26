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
  proxySpecification = message;
});
