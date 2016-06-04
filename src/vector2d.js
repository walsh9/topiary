const Vector2d = function(x,y) {
    this.x = x;
    this.y = y;
};

Vector2d.prototype.to = function (angle, length) {
    const DEG_TO_RAD = (Math.PI/180);
    let toX = this.x + Math.sin(angle * DEG_TO_RAD) * length;
    let toY = this.y + Math.cos(angle * DEG_TO_RAD) * length;
    return new Vector2d(toX, toY);
};

export default Vector2d;