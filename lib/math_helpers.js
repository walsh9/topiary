module.exports = { randomBetween };

function randomBetween (min, max) {
  return Math.random() * (max - min) + min;
}
