export default function () {
  {
    (() => {
      window.WebFontConfig = {
        google: {
          families: ['Roboto:300,400,700']
        },
        active() {
          sessionStorage.fonts = true;
        }
      };
      const wf = document.createElement('script');
      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
      wf.async = 'true';
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    })()
  }
};
