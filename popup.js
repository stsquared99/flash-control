function getCurrentSite(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];

    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    var site = url.replace(/([^\/])\/[^\/].*/, "$1")

    callback(site);
  });
}

function renderStatus(site) {
  // document.getElementById('status').removeAttribute("checked");
  document.getElementById('status').setAttribute("checked", true);
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentSite(function(site) {
    renderStatus(site);
  });
});