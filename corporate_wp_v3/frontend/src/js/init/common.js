const APP = APP || {}
APP.common = {}
APP.common.init = function () {
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
    this.fontName = ['Noto+Sans+JP:400,500,700,900'];
  },
  async events() {
    this.window.on('resize', this.onResize.bind(this))
    this.window.on('load', this.getWebFont.bind(this))
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
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
