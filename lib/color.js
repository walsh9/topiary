// HSL colors
const { randomBetween } = require('./math_helpers');

const Color = function (h, s, l) {
  if (typeof h === 'string' && s === undefined) {
    this.h = parseInt(style.split('(')[1]);
    this.s = parseInt(style.split(',')[1]);
    this.l = parseInt(style.split(',')[2]);
  } else {
    this.h = h;
    this.s = s;
    this.l = l;
  }
};

Color.prototype.toStyle = function () {
  return 'hsl(' + this.h + ',' + this.s + '%,' + this.l + '%)';
};

Color.prototype.darker = function (n) {
  return new Color(this.h, this.s, Math.max(0, this.l - n));
};

Color.prototype.shiftHue = function (n) {
  let newH = this.h + n % 359;
  return new Color(newH, this.s, this.l);
};

Color.prototype.random = function () {
  let h = randomBetween(0, 359);
  let s = randomBetween(0, 100);
  let l = randomBetween(0, 100);
  return new Color(h, s, l);
};

module.exports = Color;
