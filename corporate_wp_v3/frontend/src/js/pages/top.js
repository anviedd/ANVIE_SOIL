export default class Top {
  constructor($document) {

  }
}

new Top($(document), {
  x: window.innerWidth,
  y: window.innerHeight
}).init()
