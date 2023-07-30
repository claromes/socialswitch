// Tested URLs

// https://instagram.com/instagram
// https://instagram.com/instagram/
// https://instagram.com/instagram/?hl=en

// https://instagram.com/instagram/tagged
// https://instagram.com/instagram/tagged/

// https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Finstagram%2Ftagged%2F%3F__coig_login%3D1

const PicukiBaseUrl = 'https://www.picuki.com';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url && tab.url.startsWith('https://www.instagram.com/')) {

    //https://www.instagram.com/<HANDLE>
    //https://www.instagram.com/<HANDLE>/?
    const regexProfile = /^https:\/\/instagram\.com\/([^/?]+)\/?\??.*$/;

    if (regexProfile) {
      const handleProfile = tab.url.split("/")[3];
      const redirectUrl = `${PicukiBaseUrl}/profile/${handleProfile}/`;
      chrome.tabs.update(tabId, { url: redirectUrl });
    }

    //https://www.instagram.com/<HANDLE>/tagged
    //https://www.instagram.com/<HANDLE>/tagged/?
    const regexTagged = /^https:\/\/www\.instagram\.com\/([^/]+)\/tagged\/?\??$/;
    const matchTagged = tab.url.match(regexTagged);

    if (matchTagged) {
      const handleTagged = matchTagged[1];
      const redirectUrlTagged = `${PicukiBaseUrl}/profile-tagged/${handleTagged}/`;

      chrome.tabs.update(tabId, { url: redirectUrlTagged });
    }

    //https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F<HANDLE>%2Ftagged%2F%3F__coig_login%3D1
    const regexTaggedLogin = /^https:\/\/www\.instagram\.com\/accounts\/login\/\?next=https%3A%2F%2Fwww.instagram.com%2F([^/?]+)%2Ftagged%2F%3F__coig_login%3D1/;
    const matchTaggedLogin = tab.url.match(regexTaggedLogin);

    if (matchTaggedLogin) {
      const handleTaggedLogin = matchTaggedLogin[1];
      const redirectUrlTaggedLogin = `${PicukiBaseUrl}/profile-tagged/${handleTaggedLogin}/`;

      chrome.tabs.update(tabId, { url: redirectUrlTaggedLogin });
    }
  }
});
