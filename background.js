// States
function getMessagesIG(request) {
  const switchStateIG = request.switchStateIG;
  const selectedOptionIG = request.selectedOptionIG;

  chrome.storage.local.set({ switchStateIG: switchStateIG, selectedOptionIG: selectedOptionIG });

  return [switchStateIG, selectedOptionIG];
}

function getMessagesTT(request) {
  const switchStateTT = request.switchStateTT;
  const selectedOptionTT = request.selectedOptionTT;

  chrome.storage.local.set({ switchStateTT: switchStateTT, selectedOptionTT: selectedOptionTT });

  return [switchStateTT, selectedOptionTT];
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const [switchStateIG, selectedOptionIG] = getMessagesIG(request);
  sendResponse({ switchStateIG: switchStateIG, selectedOptionIG: selectedOptionIG });

  const [switchStateTT, selectedOptionTT] = getMessagesTT(request);
  sendResponse({ switchStateTT: switchStateTT, selectedOptionTT: selectedOptionTT });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // -- Instagram --
  // Get storage option
  chrome.storage.local.get(['switchStateIG', 'selectedOptionIG'], function(result) {
    switchStateIG = result.switchStateIG || false;
    selectedOptionIG = result.selectedOptionIG || 'picuki';

    // Set storage option
    chrome.storage.local.set({ switchStateIG: switchStateIG, selectedOptionIG: selectedOptionIG });

    if (switchStateIG) {
      let baseUrl;

      if (selectedOptionIG === 'picuki') {
        baseUrl = 'https://picuki.com';
      } else if (selectedOptionIG === 'imginn') {
        baseUrl = 'https://imginn.com';
      }

      // https://www.instagram.com/*
      if (tab.url && tab.url.startsWith('https://www.instagram.com/')) {
        let profile;
        let profileTagged;

        if (baseUrl.includes('picuki')) {
          profile = '/profile/';
          profileTagged = '/profile-tagged/';
        } else if (baseUrl.includes('imginn')) {
          profile = '/';
          profileTagged = '/tagged/';
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
          const redirectUrl = `${baseUrl}${profile}${handleProfile}`;

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
            baseUrl = 'https://imginn.com';
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
            baseUrl = 'https://imginn.com';
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
            baseUrl = 'https://imginn.com';
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
          const redirectUrlTagged = `${baseUrl}${profileTagged}${handleTagged}`;

          chrome.tabs.update(tabId, { url: redirectUrlTagged });
        }

        // https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F<handle>%2Ftagged*__coig_login%3D1
        const regexTaggedLogin = /^https:\/\/www\.instagram\.com\/accounts\/login\/\?next=https%3A%2F%2Fwww.instagram.com%2F([^/?]+)%2Ftagged([^/?]+)__coig_login%3D1/;
        const matchTaggedLogin = tab.url.match(regexTaggedLogin);

        if (matchTaggedLogin) {
          const handleTaggedLogin = matchTaggedLogin[1];
          const redirectUrlTaggedLogin = `${baseUrl}${profileTagged}${handleTaggedLogin}`;

          chrome.tabs.update(tabId, { url: redirectUrlTaggedLogin });
        }

        // Only Imginn
        // https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fstories%2F<handle>%2F
        const regexStoryLogin = /^https:\/\/www\.instagram\.com\/accounts\/login\/\?next=https%3A%2F%2Fwww.instagram.com%2Fstories%2F([^/?]+)%2F/;
        const matchStoryLogin = tab.url.match(regexStoryLogin);

        if (matchStoryLogin) {
          baseUrl = 'https://imginn.com';
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
          baseUrl = 'https://picuki.com';
          const tagName = matchTags[1];
          const redirectUrlTags = `${baseUrl}/tag/${tagName}`;

          chrome.tabs.update(tabId, { url: redirectUrlTags });
        }
      }
    }
  });

  // -- TikTok --
  // Get storage option
  chrome.storage.local.get(['switchStateTT', 'selectedOptionTT'], function(result) {
    switchStateTT = result.switchStateTT || false;
    selectedOptionTT = result.selectedOptionTT || 'urlebird';

    // Set storage option
    chrome.storage.local.set({ switchStateTT: switchStateTT, selectedOptionTT: selectedOptionTT });

    if (switchStateTT) {
      let baseUrlTT;

      if (selectedOptionTT === 'urlebird') {
        baseUrlTT = 'https://urlebird.com/';
      } else if (selectedOptionTT === 'xaller') {
        baseUrlTT = 'https://xaller.com/';
      }

      // https://www.tiktok.com/*
      if (tab.url && tab.url.startsWith('https://www.tiktok.com/')) {

        let profile;
        let slash;

        if (baseUrlTT.includes('urlebird')) {
          profile = 'user/';
          slash = '/';
        } else if (baseUrlTT.includes('xaller')) {
          profile = '?username=@';
          slash = '';
        }

        const handleProfileWithAt = tab.url.split("/")[3];
        let handleProfileTT = handleProfileWithAt.replace(/^@/, '');

        // delete params
        handleProfileTT = handleProfileTT.replace(/\?.*$/, '');

        const regexLongCode = /^https:\/\/www\.tiktok\.com\/[^/]+\/video\/([^/?]+)/;
        const matchLongCode = tab.url.match(regexLongCode);

        const regexIsNotProfile = /@(.+)/;
        const isNotProfile = regexIsNotProfile.test(handleProfileWithAt)

        // https://www.tiktok.com/@<handle>
        // https://www.tiktok.com/@<handle>/*
        if (handleProfileWithAt.startsWith('@') && isNotProfile && !matchLongCode) {
          const redirectTTUrl = `${baseUrlTT}${profile}${handleProfileTT}${slash}`;

          chrome.tabs.update(tabId, { url: redirectTTUrl });
        }
      }
    }
  });
});
