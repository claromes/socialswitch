chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url && tab.url.startsWith("https://www.instagram.com/")) {
    if (tab.url.match(/^https:\/\/www\.instagram\.com\/[^/]+\/$/)) {
      const handle = tab.url.split("/")[3];
      const redirectUrl = `https://www.picuki.com/profile/${handle}/`;
      chrome.tabs.update(tabId, { url: redirectUrl });
    }
  }
});
