import puppeteer from 'puppeteer';
import path from 'path';
import webExt from 'web-ext';

const option = process.argv[2];
const browserOption = process.argv[3];

if (!option) {
  console.error('Please provide a value for the group variable.');
  process.exit(1);
}

if (browserOption !== 'chrome' && browserOption !== 'firefox') {
  console.error(
    'The value for the browser variable must be firefox or chrome.'
  );
  process.exit(1);
}

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

const group = eval(option);

async function testChrome(group) {
  const pathToExtension = path.join(process.cwd(), './chrome');
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });

  console.log('The tested URLs are:', group);

  for (const url of group) {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}

async function testFirefox(group) {
  const pathToExtension = path.join(process.cwd(), './firefox');
  const options = {
    sourceDir: pathToExtension,
    firefox: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
    startUrl: group
  };

  console.log('The tested URLs are:', group);

  await webExt.cmd.run(options);
}

if (browserOption === 'chrome') {
  testChrome(group);
} else if (browserOption === 'firefox') {
  testFirefox(group);
}
