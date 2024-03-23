import puppeteer from 'puppeteer';
import path from 'path';

(async () => {
  const pathToExtension = path.join(process.cwd(), './');
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });

  const ig_profile = [
    'https://instagram.com/instagram',
    'https://instagram.com/instagram/',
    'https://instagram.com/instagram/?hl=en',
    'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Finstagram%2F'
  ];

  const ig_tagged = [
    'https://instagram.com/instagram/tagged',
    'https://instagram.com/instagram/tagged/',
    'https://instagram.com/instagram/tagged/?hl=en',
    'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Finstagram%2Ftagged%2F',
    'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Finstagram%2Ftagged%2F%3F__coig_login%3D1',
    'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Finstagram%2Ftagged%2F%3Fhl%3Den%26__coig_login%3D1'
  ];

  const ig_post = [
    'https://www.instagram.com/p/CwX31XMMYAV',
    'https://www.instagram.com/p/CwX31XMMYAV/',
    'https://www.instagram.com/p/CwX31XMMYAV/?hl=en',
    'https://www.instagram.com/instagram/p/CwX31XMMYAV',
    'https://www.instagram.com/instagram/p/CwX31XMMYAV/',
    'https://www.instagram.com/instagram/p/CwX31XMMYAV/?hl=en',
    'https://www.instagram.com/reel/CwX31XMMYAV',
    'https://www.instagram.com/reel/CwX31XMMYAV/',
    'https://www.instagram.com/reel/CwX31XMMYAV/?hl=en',
    'https://www.instagram.com/instagram/reel/CwX31XMMYAV',
    'https://www.instagram.com/instagram/reel/CwX31XMMYAV/',
    'https://www.instagram.com/instagram/reel/CwX31XMMYAV/?hl=en'
  ];

  const ig_stories = [
    'https://www.instagram.com/stories/instagram',
    'https://www.instagram.com/stories/instagram/',
    'https://www.instagram.com/stories/instagram/?hl=en',
    'https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fstories%2Finstagram%2F'
  ];

  const ig_tags = [
    'https://www.instagram.com/explore/tags/instagram',
    'https://www.instagram.com/explore/tags/instagram/',
    'https://www.instagram.com/explore/tags/instagram/?hl=en'
  ];

  const tt_profile = [
    'https://tiktok.com/@tiktok',
    'https://tiktok.com/@tiktok/',
    'https://tiktok.com/@tiktok?lang=en',
    'https://www.tiktok.com/@tiktok#:~:text=Tik%20Tok%20(%40tiktok)%20%7C%20TikTok'
  ];

  // Change the array with the URLs to test each group: ig_profile, ig_tagged, ig_post, ig_stories, ig_tags, and tt_profile
  for (const url of ig_profile) {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const status = await page.evaluate(() => {
      return {
        url: window.location.href,
        statusCode: window.location.pathname.includes('404') ? 404 : 200
      };
    });
    console.log(`URL: ${status.url}, Status Code: ${status.statusCode}`);
  }
})();
