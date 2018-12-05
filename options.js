function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    proxySwitcherooConfig: {
      onType: document.querySelector("#ontype").value,
      offType: document.querySelector("#offtype").value,
    }
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    if (result.proxySwitcherooConfig) {
      document.querySelector("#ontype").value = result.proxySwitcherooConfig.onType || defOnType;
      document.querySelector("#offtype").value = result.proxySwitcherooConfig.offType || defOffType;
    }
  }

  getConfig().then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
