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

      // https://www.instagram.com/*
      if (tab.url && tab.url.startsWith('https://www.instagram.com/')) {
        let Profile;
        let ProfileTagged;

        if (baseUrl.includes('picuki')) {
          Profile = '/profile/';
          ProfileTagged = '/profile-tagged/';
        } else if (baseUrl.includes('imginn')) {
          Profile = '/';
          ProfileTagged = '/tagged/';
        }

        const handleProfile = tab.url.split("/")[3];
        const handleProfileWithPost = tab.url.split("/")[4];

        // Ignore post, stories, reel, TV and explore URLs
        if (handleProfile !== 'p' &&
            handleProfileWithPost !== 'p'&&
            handleProfileWithPost !== 'reel'&&
            handleProfile !== 'stories' &&
            handleProfile !== 's' &&
            handleProfile !== 'reel'  &&
            handleProfile !== 'tv' &&
            handleProfile !== 'explore') {
          // https://instagram.com/<handle>
          // https://instagram.com/<handle>/
          // https://instagram.com/<handle>/?hl=en
          let redirectUrl = `${baseUrl}${Profile}${handleProfile}`;

          chrome.tabs.update(tabId, { url: redirectUrl });
        } else if (handleProfile === 'p' || handleProfile === 'reel') {
          // Only Imginn
          // https://www.instagram.com/p/<short_code>
          // https://www.instagram.com/p/<short_code>/*
          // https://www.instagram.com/reel/<short_code>
          // https://www.instagram.com/reel/<short_code>/*
          const regexPost = /https:\/\/www\.instagram\.com\/p\/([A-Za-z0-9_-]+)\//;
          const regexPostReel = /https:\/\/www\.instagram\.com\/reel\/([A-Za-z0-9_-]+)\//;
          const matchPost = tab.url.match(regexPost);
          const matchPostReel = tab.url.match(regexPostReel);

          if (matchPost || matchPostReel) {
            baseUrl = 'https://www.imginn.com';
            const postCode = matchPost ? matchPost[1] : matchPostReel[1];
            const redirectUrlPost = `${baseUrl}/p/${postCode}`;

            chrome.tabs.update(tabId, { url: redirectUrlPost });
          }
        } else if (handleProfileWithPost === 'p' || handleProfileWithPost === 'reel') {
          // Only Imginn
          // https://www.instagram.com/<handle>/p/<short_code>
          // https://www.instagram.com/<handle>/p/<short_code>/*
          // https://www.instagram.com/<handle>/reel/<short_code>
          // https://www.instagram.com/<handle>/reel/<short_code>/*
          const regexHandlePost = /^https:\/\/www\.instagram\.com\/[^/]+\/p\/([^/?]+)/;
          const regexHandlePostReel = /^https:\/\/www\.instagram\.com\/[^/]+\/reel\/([^/?]+)/;
          const matchHandlePost = tab.url.match(regexHandlePost);
          const matchHandlePostReel = tab.url.match(regexHandlePostReel);

          if (matchHandlePost || matchHandlePostReel) {
            baseUrl = 'https://www.imginn.com';
            const handlePostCode = matchHandlePost ? matchHandlePost[1] : matchHandlePostReel[1];
            const redirectUrlHandlePost = `${baseUrl}/p/${handlePostCode}`;

            chrome.tabs.update(tabId, { url: redirectUrlHandlePost });
          }
        } else if (handleProfile === 'stories') {
          // Only Imginn
          // https://www.instagram.com/stories/<handle>
          // https://www.instagram.com/stories/<handle>/*
          const regexStory = /https:\/\/www\.instagram\.com\/stories\/([A-Za-z0-9._]+)/;
          const matchStory = tab.url.match(regexStory);

          if (matchStory) {
            baseUrl = 'https://www.imginn.com';
            const handleStory = matchStory[1];
            const redirectUrlStory = `${baseUrl}/stories/${handleStory}`;

            chrome.tabs.update(tabId, { url: redirectUrlStory });
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

        // https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F<handle>%2Ftagged*__coig_login%3D1
        const regexTaggedLogin = /^https:\/\/www\.instagram\.com\/accounts\/login\/\?next=https%3A%2F%2Fwww.instagram.com%2F([^/?]+)%2Ftagged([^/?]+)__coig_login%3D1/;
        const matchTaggedLogin = tab.url.match(regexTaggedLogin);

        if (matchTaggedLogin) {
          const handleTaggedLogin = matchTaggedLogin[1];
          const redirectUrlTaggedLogin = `${baseUrl}${ProfileTagged}${handleTaggedLogin}`;

          chrome.tabs.update(tabId, { url: redirectUrlTaggedLogin });
        }

        // Only Imginn
        // https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fstories%2F<handle>%2F
        const regexStoryLogin = /^https:\/\/www\.instagram\.com\/accounts\/login\/\?next=https%3A%2F%2Fwww.instagram.com%2Fstories%2F([^/?]+)%2F/;
        const matchStoryLogin = tab.url.match(regexStoryLogin);

        if (matchStoryLogin) {
          baseUrl = 'https://www.imginn.com';
          const handleStoryLogin = matchStoryLogin[1];
          const redirectUrlStoryLogin = `${baseUrl}/stories/${handleStoryLogin}`;

          chrome.tabs.update(tabId, { url: redirectUrlStoryLogin });
        }

        // Only Picuki
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
