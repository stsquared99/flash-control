function getCurrentSite(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];

    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    var site = url.replace(/([^\/])\/[^\/].*/, '$1')

    callback(site);
  });
}

function renderStatus() {
  getCurrentSite(function(site) {
    chrome.contentSettings.plugins.get({
      'primaryUrl': site + '/*',
    },
    function(details) {
      console.log(details);
      if (details.setting === 'allow') {
        document.getElementById('status').setAttribute('checked', true);

        return;
      }

      document.getElementById('status').removeAttribute('checked');
    });
  });
}

function updateStatus(site) {
  getCurrentSite(function(site) {
    chrome.contentSettings.plugins.get({
      'primaryUrl': site + '/*',
    },
    function(details) {
      console.log(details);

      var setting = 'allow';

      if (details.setting === 'allow') {
        setting = 'detect_important_content';
      }

      getCurrentSite(function(site) {
        chrome.contentSettings.plugins.set({
          'primaryPattern': site + '/*',
          'setting': setting,
        }, function() {
          renderStatus();
        });
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('status').addEventListener('click', function() {
    updateStatus();
  });

  renderStatus();
});

