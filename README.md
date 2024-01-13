# Social Switch

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/elmbjjhgiifenlhffpjcjfkjmilbbfki)](https://chrome.google.com/webstore/detail/picuki-switch/elmbjjhgiifenlhffpjcjfkjmilbbfki)

<p align="center">
    <img src="icons/icon128.png">
</p>

Redirect Instagram URLs to Picuki.com or Imginn.con, Instagram viewers.

> [!NOTE]
> This extension is not affiliated with Picuki, Imginn or Instagram.

## Installation

- [Chrome Web Store](https://chrome.google.com/webstore/detail/picuki-switch/elmbjjhgiifenlhffpjcjfkjmilbbfki)

## Usage

Access any profile, posts, tagged posts, stories profile or tags on Instagram and the extension will redirect automatically to Picuki.com or Imginn.com.

Select a viewer option and enable or disable redirection through the popup.

<p align="center">
    <img src="assets\popup.jpg">
    <img src="assets\popup-2.jpg">
</p>

For post URLs (`instagram.com/p/<short_code>`) and story profiles (`instagram.com/stories/<handle>`), regardless of the redirection option, the extension will redirect to Imginn.com. This viewer uses the original post short code, and it has the option to view only stories via URL. However, for tag URLs (`instagram.com/explore/tags/<tag_name>`), irrespective of the redirection option, the extension will redirect to Picuki.com, as only this viewer supports tag search.

### Supported URLs

`instagram.com/<handle>`

`instagram.com/<handle>/tagged`

`instagram.com/stories/<handle>` *(only Imginn)*

`instagram.com/p/<short_code>` *(only Imginn)*

`instagram.com/<handle>/p/<short_code>` *(only Imginn)*

`instagram.com/reel/<short_code>` *(only Imginn)*

`instagram.com/<handle>/reel/<short_code>` *(only Imginn)*

`instagram.com/explore/tags/<tag_name>` *(only Picuki)*

### Unsupported URLs

`instagram.com/s/<long_code>?story_media_id=<story_media_id>` *(story URL)*

`instagram.com/tv/<short_code>/?igshid=<igsh_id>` *(IGTV URL)*

## Development

$ `git clone git@github.com:claromes/socialswitch.git`

$ `cd socialswitch`

[List of each type of URL for testing](urls.md)

### Linter:

Prerequisite: Node.js

$ `npm install`

$ `npm run lint`

## Roadmap

- [x] Tags URL
- [x] Post URLs
- [ ] TikTok options
- [ ] Firefox Add-ons

*Background image of the [promotional assets](assets) by [MagicPattern](https://unsplash.com/@magicpattern) on Unsplash*
