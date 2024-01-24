# Social Switch

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/elmbjjhgiifenlhffpjcjfkjmilbbfki)](https://chrome.google.com/webstore/detail/social-switch/elmbjjhgiifenlhffpjcjfkjmilbbfki)

![Social Switch](icons/icon48.png "Social Switch")

Redirect Instagram and TikTok URLs to anonymous viewers. Access any profile, posts, tagged posts, stories profile or tags on Instagram or any profile on TikTok and the extension will redirect automatically to web viewers.

From **Instagram** URLs to **Picuki.com** or **Imginn.com**, and from **TikTok** URLs to **UrleBird.com** or **Xaller.com**.

> [!NOTE]
> For those seeking an alternative redirection for open-source instances, I recommend using the LibRedirect extension. The Social Switch extension aims to streamline access to web viewers that are more stable and facilitate the download of assets from both Instagram and TikTok. It targets users who prefer these anonymous but closed-source platforms.
>
> This extension is not affiliated with Instagram, TikTok, Picuki, Imginn, UrleBird and Xaller.

## Installation

[![Install from Chrome Web Store](assets\cws_badge.png "Install from Chrome Web Store")](https://chrome.google.com/webstore/detail/social-switch/elmbjjhgiifenlhffpjcjfkjmilbbfki)

## Usage

Select a viewer option and enable or disable redirection through the popup.

<p align="center">
    <img src="assets\popup.jpg">
</p>

For Instagram post URLs (`instagram.com/p/short_code`) and Instagram stories profile URLs (`instagram.com/stories/handle`), regardless of the redirection option, the extension will redirect to Imginn.com. This viewer uses the original post short code, and it has the option to view only stories via URL. However, for tag URLs (`instagram.com/explore/tags/tag_name`), irrespective of the redirection option, the extension will redirect to Picuki.com, as only this viewer supports tag search.

### Supported URLs

- Instagram:

  `instagram.com/handle`

  `instagram.com/handle/tagged`

  `instagram.com/stories/handle` *(only Imginn)*

  `instagram.com/p/short_code` *(only Imginn)*

  `instagram.com/handle/p/short_code` *(only Imginn)*

  `instagram.com/reel/short_code` *(only Imginn)*

  `instagram.com/handle/reel/short_code` *(only Imginn)*

  `instagram.com/explore/tags/tag_name` *(only Picuki)*

- TikTok:

  `tiktok.com/@handle`

### Unsupported URLs

- Instagram:

  `instagram.com/s/long_code?story_media_id=story_media_id` *(story URL)*

  `instagram.com/tv/short_code/?igshid=igsh_id` *(IGTV URL)*

- TikTok:

  `tiktok.com/@handle/video/long_code` *(video URL)*

  `tiktok.com/following` *(following URL)*

  `tiktok.com/friends` *(friends URL)*

  `tiktok.com/explore` *(explore URL)*

  `tiktok.com/@` *(your own profile URL)*

## Development

$ `git clone git@github.com:claromes/socialswitch.git`

$ `cd socialswitch`

[List of each type of URL for testing](urls.md)

## Roadmap

- [x] Tags URL
- [x] Post URLs
- [ ] TikTok options
  - [x] User
  - [ ] Video
- [ ] Firefox Add-ons

## Credits

- [Claromes](https://claromes.com), author and maintainer
- [MagicPattern](https://unsplash.com/@magicpattern), background image of the [promotional assets](assets)
