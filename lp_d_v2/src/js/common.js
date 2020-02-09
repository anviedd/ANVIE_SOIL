require('@babel/polyfill');
import sleep from 'js-util/sleep';



// const init = async () => {
//   await sleep(100);

//   // resize
//   const SET_WW = 0
//   const SET_WH = 0
//   const constresizeThrottle = false

// }
// init();

const APP = APP || {}
APP.common = {}
APP.common.init = async function () {
  await sleep(100);
  this.init()
}
APP.common.init.prototype = {
  async init() {
    this.constructor()
    this.events()
  },
  async constructor() {
    this.window = $(window)
    this.SET_WW = this.window.width()
    this.SET_WH = this.window.height()
    this.constresizeThrottle = false

    this.script = document.createElement('script');
    this.scriptTag = document.getElementsByTagName('script')[0];
    this.fontName = ['Barlow+Condensed:500,600,700'];


  },
  async events() {
    this.window.on('resize', this.onResize.bind(this))
    this.window.on('load', this.getWebFont.bind(this))
  },
  async onResize() {
    if (!this.resizeThrottle) {
      requestAnimationFrame(() => {
        this.resizeThrottle = false;
        this.SET_WW = window.innerWidth;
        this.SET_WH = window.innerHeight;
      });
      this.resizeThrottle = true;
    }
  },
  async getWebFont() {
    window.WebFontConfig = {
      google: {
        families: this.fontName,
      },
      active() {
        sessionStorage.fonts = true;
      }
    };
    this.script.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    this.script.async = 'true';
    this.scriptTag.parentNode.insertBefore(this.script, this.scriptTag);
  }
}

new APP.common.init();