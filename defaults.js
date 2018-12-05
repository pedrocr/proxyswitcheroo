const defEnabled = false;

const defOnType = "manual";

function onError(error) {
  console.log(`Error: ${error}`);
}

function getConfig() {
  return browser.storage.local.get({
    proxySwitcherooConfig: {
      onType:  defOnType,
    }
  });
}

function getEnabled() {
  return browser.storage.local.get({
    proxySwitcherooEnabled: defEnabled
  });
}

function setEnabled(enabled) {
  return browser.storage.local.set({
    proxySwitcherooEnabled: enabled
  });
}
