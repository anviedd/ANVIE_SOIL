import '../css/main.scss';

require('@babel/polyfill');

const pageId = document.querySelector('.l-page').getAttribute('data-page-id');
const init = async () => {
  require('./init/common.js')
  switch (pageId) {
    case 'front-page':
      require('./pages/top.js')
      break;
  }
}
init();