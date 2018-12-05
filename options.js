function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    proxySwitcherooConfig: {
      onType: document.querySelector("#ontype").value,
    }
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    if (result.proxySwitcherooConfig) {
      document.querySelector("#ontype").value = result.proxySwitcherooConfig.onType || defOnType;
    }
  }

  getConfig().then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
