const PicukiBaseUrl = 'https://www.picuki.com';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url && tab.url.startsWith('https://www.instagram.com/')) {

    // https://instagram.com/<handle>
    // https://instagram.com/<handle>/
    // https://instagram.com/<handle>/?hl=en
    const regexProfile = /^https:\/\/instagram\.com\/([^/?]+)\/?\??.*$/;

    if (regexProfile) {
      const handleProfile = tab.url.split("/")[3];
      const redirectUrl = `${PicukiBaseUrl}/profile/${handleProfile}`;
      chrome.tabs.update(tabId, { url: redirectUrl });
    }

    // https://instagram.com/<handle>/tagged
    // https://instagram.com/<handle>/tagged/
    const regexTagged = /^https:\/\/www\.instagram\.com\/([^/]+)\/tagged\/?\??$/;
    const matchTagged = tab.url.match(regexTagged);

    if (matchTagged) {
      const handleTagged = matchTagged[1];
      const redirectUrlTagged = `${PicukiBaseUrl}/profile-tagged/${handleTagged}`;

      chrome.tabs.update(tabId, { url: redirectUrlTagged });
    }

    // https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F<handle>%2Ftagged%2F%3F__coig_login%3D1
    const regexTaggedLogin = /^https:\/\/www\.instagram\.com\/accounts\/login\/\?next=https%3A%2F%2Fwww.instagram.com%2F([^/?]+)%2Ftagged%2F%3F__coig_login%3D1/;
    const matchTaggedLogin = tab.url.match(regexTaggedLogin);

    if (matchTaggedLogin) {
      const handleTaggedLogin = matchTaggedLogin[1];
      const redirectUrlTaggedLogin = `${PicukiBaseUrl}/profile-tagged/${handleTaggedLogin}`;

      chrome.tabs.update(tabId, { url: redirectUrlTaggedLogin });
    }

    // https://www.instagram.com/explore/tags/<tag_name>
    // https://www.instagram.com/explore/tags/<tag_name>/
    const regexTags = /^https:\/\/www\.instagram\.com\/explore\/tags\/([^/]+)/;
    const matchTags = tab.url.match(regexTags);

    if (matchTags) {
      const tagName = matchTags[1];
      const redirectUrlTags = `${PicukiBaseUrl}/tag/${tagName}`;

      chrome.tabs.update(tabId, { url: redirectUrlTags });
    }
  }
});
