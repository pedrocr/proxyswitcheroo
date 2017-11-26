function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    proxySwitcherooConfig: {
      type: document.querySelector("#type").value,
      host: document.querySelector("#host").value,
      port: document.querySelector("#port").value,
      proxyDNS: document.querySelector("#proxydns").checked
    }
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    if (result.proxySwitcherooConfig) {
      document.querySelector("#type").value = result.proxySwitcherooConfig.type || defType;
      document.querySelector("#host").value = result.proxySwitcherooConfig.host || defHost;
      document.querySelector("#port").value = result.proxySwitcherooConfig.port || defPort;
      document.querySelector("#proxydns").checked = result.proxySwitcherooConfig.proxyDNS && true;
    }
  }

  getConfig().then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
