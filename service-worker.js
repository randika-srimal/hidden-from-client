chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url.includes('app.productive.io')) {
    chrome.tabs.sendMessage(tabId, {
      message: 'ProductiveTabUpdated'
    });
    console.log('ProductiveTabUpdated Message Sent');
  }
});