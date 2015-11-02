var Vector2d = function(x,y) {
    this.x = x;
    this.y = y;
};

Vector2d.prototype.to = function (angle, length) {
    var DEG_TO_RAD = (Math.PI/180);
    var toX = this.x + Math.sin(angle * DEG_TO_RAD) * length;
    var toY = this.y + Math.cos(angle * DEG_TO_RAD) * length;
    return new Vector2d(toX, toY);
};