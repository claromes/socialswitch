# ![Social Switch](chrome/icons/icon32.png 'Social Switch') Social Switch

[![ZIP Files](https://github.com/claromes/socialswitch/actions/workflows/main.yml/badge.svg)](https://github.com/claromes/socialswitch/actions/workflows/main.yml) [![Mozilla Add-on Users](https://img.shields.io/amo/users/social-switch?label=mozilla%20add-on%20users)](https://addons.mozilla.org/en-US/firefox/addon/social-switch)
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/elmbjjhgiifenlhffpjcjfkjmilbbfki?label=chrome%20web%20store%20users)](https://chrome.google.com/webstore/detail/social-switch/elmbjjhgiifenlhffpjcjfkjmilbbfki)

Redirect Instagram and TikTok URLs to anonymous viewers. Access any profile, posts, tagged posts, stories profile or tags on Instagram or any profile on TikTok and the extension will redirect automatically to web viewers.

From **Instagram** URLs to **Picuki.com** or **Imginn.com**, and from **TikTok** URLs to **UrleBird.com** or **Xaller.com**.

## Note

For those seeking an alternative redirection for open-source instances, I recommend using the LibRedirect extension. The Social Switch extension aims to streamline access to web viewers that are more stable and facilitate the download of assets from both Instagram and TikTok. It targets users who prefer these anonymous but closed-source platforms.

It's necessary to add that despite being anonymous for accessing Instagram and TikTok, the web services Picuki, Imginn, UrleBird, and Xaller are commercial and may track users. For this reason, it is recommended to use these services with VPNs, ad blockers, and other methods to inhibit trackers.

This extension is not affiliated with Instagram, TikTok, Picuki, Imginn, UrleBird, and Xaller and does not take responsibility for any actions of these web services.

## Installation

- Firefox Add-ons

  [![Get the add-on](assets/amo_badge.png 'Get the add-on')](https://addons.mozilla.org/en-US/firefox/addon/social-switch/)

  [![Get the add-on for Android](assets/amo_android_badge.png 'Get the add-on for Android')](https://addons.mozilla.org/en-US/android/addon/social-switch/)

- Chrome Web Store

  [![Install from Chrome Web Store](assets/cws_badge.png 'Install from Chrome Web Store')](https://chrome.google.com/webstore/detail/social-switch/elmbjjhgiifenlhffpjcjfkjmilbbfki)

- From the ZIP File

  - **Firefox for Desktop**

    - Download the [socialswitch-firefox.xpi](https://github.com/claromes/socialswitch/releases) file
    - Open Firefox and navigate to `about:addons`
    - From the settings cog, press "Install Add-on From File..." (located at the top-right corner)
    - Select the extension file

  - **Chrome**

    - Download the [socialswitch-chrome.zip](https://github.com/claromes/socialswitch/releases) file
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

### Requirement

Node.js 20 or higher

$ `git clone git@github.com:claromes/socialswitch.git`

$ `cd socialswitch`

$ `npm install`

### Common files

The files for each browser are in their respective directories. The files for **Google Chrome** are all in the `chrome` directory, and some are shared with **Firefox**.

The common files between **Google Chrome** and **Firefox** are in the `chrome` directory and consist of `chrome/popup.html`, `chrome/support.html`, and the `chrome/icons` directory.

### Firefox for Android

[Set up your computer and Android emulator or device](https://extensionworkshop.com/documentation/develop/developing-extensions-for-firefox-for-android/).

Then, run:

$ `cd firefox`

$ `web-ext run -t firefox-android --adb-device <CODE> --firefox-apk org.mozilla.fenix`

### Testing with Puppeteer

To test each group of URLs (Instagram profile, tagged, stories, post and tag, and TikTok profile), it's necessary to pass the group and the browser as options when running the script. This applies only to Firefox for Desktop and Google Chrome.

The groups are: `ig_profile`, `ig_tagged`, `ig_post`, `ig_stories`, `ig_tags`, and `tt_profile`.

The browsers are: `chrome`, and `firefox`.

Run the test with the desired group:

$ `npm test [group] [browser]`

#### Example

To test Instagram profile URLs on Firefox, run the command `npm test ig_profile firefox`.

## Roadmap

- [x] Tags URL
- [x] Post URLs
- [ ] TikTok options
  - [x] User
  - [ ] Video
- [x] Firefox extension

## Contributing

You're welcome to contribute, whether it's through bug reporting, feature suggestions, or code contributions.

## Credits

- [Claromes](https://claromes.com), author and maintainer
- [MagicPattern](https://unsplash.com/@magicpattern), background image of the [promotional assets](assets)
