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
    document.querySelector("#type").value = result.proxySwitcherooConfig.type || "socks";
    document.querySelector("#host").value = result.proxySwitcherooConfig.host || "localhost";
    document.querySelector("#port").value = result.proxySwitcherooConfig.port || 9999;
    document.querySelector("#proxydns").value = result.proxySwitcherooConfig.proxydns;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("proxySwitcherooConfig");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
