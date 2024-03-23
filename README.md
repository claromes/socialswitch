# ![Social Switch](src/icons/icon32.png 'Social Switch') Social Switch

[![Zip File](https://github.com/claromes/socialswitch/actions/workflows/main.yml/badge.svg)](https://github.com/claromes/socialswitch/actions/workflows/main.yml) [![Chrome Web Store](https://img.shields.io/chrome-web-store/v/elmbjjhgiifenlhffpjcjfkjmilbbfki)](https://chrome.google.com/webstore/detail/social-switch/elmbjjhgiifenlhffpjcjfkjmilbbfki)

Redirect Instagram and TikTok URLs to anonymous viewers. Access any profile, posts, tagged posts, stories profile or tags on Instagram or any profile on TikTok and the extension will redirect automatically to web viewers.

From **Instagram** URLs to **Picuki.com** or **Imginn.com**, and from **TikTok** URLs to **UrleBird.com** or **Xaller.com**.

> [!NOTE]
> For those seeking an alternative redirection for open-source instances, I recommend using the LibRedirect extension. The Social Switch extension aims to streamline access to web viewers that are more stable and facilitate the download of assets from both Instagram and TikTok. It targets users who prefer these anonymous but closed-source platforms. It's necessary to add that despite being anonymous for accessing Instagram and TikTok, the web services Picuki, Imginn, UrleBird, and Xaller are commercial and may track users. For this reason, it is recommended to use these services with VPNs, ad blockers, and other methods to inhibit trackers.
>
> This extension is not affiliated with Instagram, TikTok, Picuki, Imginn, UrleBird, and Xaller and does not take responsibility for any actions of these web services.

## Installation

- Web Store

  [![Install from Chrome Web Store](assets/cws_badge.png 'Install from Chrome Web Store')](https://chrome.google.com/webstore/detail/social-switch/elmbjjhgiifenlhffpjcjfkjmilbbfki)

- From the ZIP File

  - Download the [socialswitch-v0.5.2.zip](https://github.com/claromes/socialswitch/releases/tag/v0.5.2) file
  - Extract the ZIP file
  - Open Google Chrome and navigate to `chrome://extensions`
  - Enable "Developer Mode" (located at the top-right corner)
  - Click on the "Load Unpacked" button (located at the top-left corner)
  - Navigate to the directory where you extracted the ZIP file containing the extension
  - Select the extension folder

## Usage

Select a viewer option and enable or disable redirection through the popup.

![Social Switch Popup](assets/popup.jpg 'Social Switch Popup')

For Instagram post URLs (`instagram.com/p/short_code`) and Instagram stories profile URLs (`instagram.com/stories/handle`), regardless of the redirection option, the extension will redirect to Imginn.com. This viewer uses the original post short code, and it has the option to view only stories via URL. However, for tag URLs (`instagram.com/explore/tags/tag_name`), irrespective of the redirection option, the extension will redirect to Picuki.com, as only this viewer supports tag search.

### Supported URLs

- Instagram:

  `instagram.com/handle`

  `instagram.com/handle/tagged`

  `instagram.com/stories/handle` _(only Imginn)_

  `instagram.com/p/short_code` _(only Imginn)_

  `instagram.com/handle/p/short_code` _(only Imginn)_

  `instagram.com/reel/short_code` _(only Imginn)_

  `instagram.com/handle/reel/short_code` _(only Imginn)_

  `instagram.com/explore/tags/tag_name` _(only Picuki)_

- TikTok:

  `tiktok.com/@handle`

## Development

$ `git clone git@github.com:claromes/socialswitch.git`

$ `cd socialswitch`

The choice to use the `chrome.tabs` API is to avoid the blocking of redirection for certain paths by Instagram. Some tests still need to be conducted before implementing `chrome.webNavigation`, `chrome.webRequest` or `chrome.declarativeNetRequest`.

### Testing wih Puppeteer

To test each group of URLs (Instagram profile, tagged, stories, post and tag, and TikTok profile), it is necessary to pass the option of the group you want to test when running the script. The groups are: `ig_profile`, `ig_tagged`, `ig_post`, `ig_stories`, `ig_tags`, and `tt_profile`.

#### Requirement

Node.js 20 or higher

#### Installation

Install the dependencies and then run the test with the desired group:

$ `npm install`

$ `npm test [group]`

#### Example

To test Instagram profile URLs, run the command `npm test ig_profile`.

## Roadmap

- [x] Tags URL
- [x] Post URLs
- [ ] TikTok options
  - [x] User
  - [ ] Video
- [ ] Firefox extension

## Contributing

You're welcome to contribute, whether it's through bug reporting, feature suggestions, or code contributions.

## Credits

- [Claromes](https://claromes.com), author and maintainer
- [MagicPattern](https://unsplash.com/@magicpattern), background image of the [promotional assets](assets)
