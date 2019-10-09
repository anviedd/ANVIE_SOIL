require('@babel/polyfill');

import UaParser from 'ua-parser-js';
import sleep from 'js-util/sleep';

const pageId = document.querySelector('.l-page').getAttribute('data-page-id');
const uaParser = new UaParser();
const link = document.querySelector('link[as=style]');

const init = async () => {
  const browser = uaParser.getBrowser().name;
  if (browser !== 'Chrome' && browser !== 'Edge') link.rel = 'stylesheet';
  await sleep(100);
  require ('./init/common.js').default();
  switch (pageId) {
    case 'front-page':
      require ('./init/page/top').default();
      break;
    default:
  }
}
init();