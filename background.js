// States
function getMessages(request) {
  let switchState = request.switchState;
  let selectedOption = request.selectedOption;

  chrome.storage.local.set({ switchState: switchState, selectedOption: selectedOption });

  return [switchState, selectedOption];
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const [switchState, selectedOption] = getMessages(request);
  sendResponse({ switchState: switchState, selectedOption: selectedOption });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Get storage option
  chrome.storage.local.get(['switchState', 'selectedOption'], function(result) {
    switchState = result.switchState || false;
    selectedOption = result.selectedOption || 'picuki';

    // Set storage option
    chrome.storage.local.set({ switchState: switchState, selectedOption: selectedOption });

    if (!switchState) {
      let BaseUrl;

      if (selectedOption === 'picuki') {
        BaseUrl = 'https://www.picuki.com';
      } else if (selectedOption === 'imginn') {
        BaseUrl = 'https://www.imginn.com';
      }
    
      if (tab.url && tab.url.startsWith('https://www.instagram.com/')) {
        // https://instagram.com/<handle>
        // https://instagram.com/<handle>/
        // https://instagram.com/<handle>/?hl=en
        const regexProfile = /^https:\/\/instagram\.com\/([^/?]+)\/?\??.*$/;
    
        let Profile;
        let ProfileTagged;
    
        if (BaseUrl.includes('picuki')) {
          Profile = '/profile/';
          ProfileTagged = '/profile-tagged/';
        } else if (BaseUrl.includes('imginn')) {
          Profile = '/';
          ProfileTagged = '/tagged/';
        }
    
        if (regexProfile) {
          const handleProfile = tab.url.split("/")[3];
    
          // Ignore post, reel, TV and explore URLs
          if (handleProfile !== 'p' && handleProfile !== 'reel'  && handleProfile !== 'tv'  && handleProfile !== 'explore') {
            let redirectUrl = `${BaseUrl}${Profile}${handleProfile}`;
            
            chrome.tabs.update(tabId, { url: redirectUrl });
          }
        }
    
        // https://instagram.com/<handle>/tagged
        // https://instagram.com/<handle>/tagged/
        const regexTagged = /^https:\/\/www\.instagram\.com\/([^/]+)\/tagged\/?\??$/;
        const matchTagged = tab.url.match(regexTagged);
    
        if (matchTagged) {
          const handleTagged = matchTagged[1];
          const redirectUrlTagged = `${BaseUrl}${ProfileTagged}${handleTagged}`;
    
          chrome.tabs.update(tabId, { url: redirectUrlTagged });
        }
    
        // https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F<handle>%2Ftagged%2F%3F__coig_login%3D1
        const regexTaggedLogin = /^https:\/\/www\.instagram\.com\/accounts\/login\/\?next=https%3A%2F%2Fwww.instagram.com%2F([^/?]+)%2Ftagged%2F%3F__coig_login%3D1/;
        const matchTaggedLogin = tab.url.match(regexTaggedLogin);
    
        if (matchTaggedLogin) {
          const handleTaggedLogin = matchTaggedLogin[1];
          const redirectUrlTaggedLogin = `${BaseUrl}${ProfileTagged}${handleTaggedLogin}`;
    
          chrome.tabs.update(tabId, { url: redirectUrlTaggedLogin });
        }
    
        //Only Picuki
        // https://www.instagram.com/explore/tags/<tag_name>
        // https://www.instagram.com/explore/tags/<tag_name>/
        const regexTags = /^https:\/\/www\.instagram\.com\/explore\/tags\/([^/]+)/;
        const matchTags = tab.url.match(regexTags);
    
        if (matchTags && BaseUrl.includes('picuki')) {
          const tagName = matchTags[1];
          const redirectUrlTags = `${BaseUrl}/tag/${tagName}`;
    
          chrome.tabs.update(tabId, { url: redirectUrlTags });
        }
    
        //Only Imginn
        //https://www.instagram.com/p/<short_code>
        //https://www.instagram.com/p/<short_code>/
        const regexPost = /^https:\/\/www\.instagram\.com\/([^/]+)\/p\/?\??$/;
        const matchPost = tab.url.match(regexPost);
    
        if (matchPost) {
          const postCode = matchPost[1];
          const redirectUrlPost = `${BaseUrl}/p/${postCode}`;
    
          chrome.tabs.update(tabId, { url: redirectUrlPost });
        }
      }
    }
  });
});
