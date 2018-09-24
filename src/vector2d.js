class Vector2d {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}

Vector2d.prototype.to = function (angle, length) {
  const DEG_TO_RAD = (Math.PI / 180);
  const toX = this.x + Math.sin(angle * DEG_TO_RAD) * length;
  const toY = this.y + Math.cos(angle * DEG_TO_RAD) * length;
  return new Vector2d(toX, toY);
};

module.exports = Vector2d;
