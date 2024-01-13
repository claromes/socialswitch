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
      let baseUrl;

      if (selectedOption === 'picuki') {
        baseUrl = 'https://www.picuki.com';
      } else if (selectedOption === 'imginn') {
        baseUrl = 'https://www.imginn.com';
      }
    
      if (tab.url && tab.url.startsWith('https://www.instagram.com/')) {
        // https://instagram.com/<handle>
        // https://instagram.com/<handle>/
        // https://instagram.com/<handle>/?hl=en
        const regexHandle = /^https:\/\/instagram\.com\/([^/?]+)\/?\??.*$/;
    
        let Profile;
        let ProfileTagged;
    
        if (baseUrl.includes('picuki')) {
          Profile = '/profile/';
          ProfileTagged = '/profile-tagged/';
        } else if (baseUrl.includes('imginn')) {
          Profile = '/';
          ProfileTagged = '/tagged/';
        }
    
        if (regexHandle) {
          const handleProfile = tab.url.split("/")[3];
    
          // Ignore post, stories, reel, TV and explore URLs
          if (handleProfile !== 'p' && handleProfile !== 'stories' && handleProfile !== 's' && handleProfile !== 'reel'  && handleProfile !== 'tv'  && handleProfile !== 'explore') {
            let redirectUrl = `${baseUrl}${Profile}${handleProfile}`;
            
            chrome.tabs.update(tabId, { url: redirectUrl });
          } else if (handleProfile === 'p') {
            //Only Imginn
            //https://www.instagram.com/p/<short_code>
            //https://www.instagram.com/p/<short_code>/*
            const regexPost = /https:\/\/www\.instagram\.com\/p\/([A-Za-z0-9_-]+)\//;
            const matchPost = tab.url.match(regexPost);
        
            if (matchPost) {
              baseUrl = 'https://www.imginn.com';
              const postCode = matchPost[1];
              const redirectUrlPost = `${baseUrl}/p/${postCode}`;
        
              chrome.tabs.update(tabId, { url: redirectUrlPost });
            }
          } else if (handleProfile === 'stories') {
            //Only Imginn
            //https://www.instagram.com/stories/<handle>
            //https://www.instagram.com/stories/<handle>/*
            const regexStory = /https:\/\/www\.instagram\.com\/stories\/([A-Za-z0-9._]+)/;
            const matchStory = tab.url.match(regexStory);
        
            if (matchStory) {
              baseUrl = 'https://www.imginn.com';
              const handleStory = matchStory[1];
              const redirectUrlStory = `${baseUrl}/stories/${handleStory}`;
        
              chrome.tabs.update(tabId, { url: redirectUrlStory });
            }
          }
        }
    
        // https://instagram.com/<handle>/tagged
        // https://instagram.com/<handle>/tagged/*
        const regexTagged = /^https:\/\/www\.instagram\.com\/([^/]+)\/tagged\/?\??$/;
        const matchTagged = tab.url.match(regexTagged);
    
        if (matchTagged) {
          const handleTagged = matchTagged[1];
          const redirectUrlTagged = `${baseUrl}${ProfileTagged}${handleTagged}`;
    
          chrome.tabs.update(tabId, { url: redirectUrlTagged });
        }
    
        // https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F<handle>%2Ftagged%2F%3F__coig_login%3D1
        const regexTaggedLogin = /^https:\/\/www\.instagram\.com\/accounts\/login\/\?next=https%3A%2F%2Fwww.instagram.com%2F([^/?]+)%2Ftagged%2F%3F__coig_login%3D1/;
        const matchTaggedLogin = tab.url.match(regexTaggedLogin);
    
        if (matchTaggedLogin) {
          const handleTaggedLogin = matchTaggedLogin[1];
          const redirectUrlTaggedLogin = `${baseUrl}${ProfileTagged}${handleTaggedLogin}`;
    
          chrome.tabs.update(tabId, { url: redirectUrlTaggedLogin });
        }
    
        //Only Picuki
        // https://www.instagram.com/explore/tags/<tag_name>
        // https://www.instagram.com/explore/tags/<tag_name>/*
        const regexTags = /^https:\/\/www\.instagram\.com\/explore\/tags\/([^/]+)/;
        const matchTags = tab.url.match(regexTags);
    
        if (matchTags) {
          baseUrl = 'https://www.picuki.com';
          const tagName = matchTags[1];
          const redirectUrlTags = `${baseUrl}/tag/${tagName}`;
    
          chrome.tabs.update(tabId, { url: redirectUrlTags });
        }
      }
    }
  });
});
