chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    chrome.extension.sendMessage({
      action: "sendSource",
      source: request.source
    });
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "js/getSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.extension.lastError) {
      alert('There was an error injecting script : \n' + chrome.extension.lastError.message);
    }
  });
}

window.onload = onWindowLoad;