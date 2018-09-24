const { randomBetween } = require('./lib/math_helpers');

class Topiary {
  constructor (treeOptions, mutationOptions) {
    let mutationDefaults = {
      minLeftAngle: 10,
      maxLeftAngle: 40,
      minRightAngle: 10,
      maxRightAngle: 40,
      minHeightChange: 0.6,
      maxHeightChange: 0.9,
      minThicknessChange: 0.6,
      maxThicknessChange: 0.9
    };

    this.treeOptions = treeOptions;
    this.mutationOptions = mutationOptions || mutationDefaults;
    this.draw = function () { this.drawTree(this.treeOptions); };
    this.kill = function () { this.alive = false; };

    this.alive = true;
  }

  mutate (treeOptions, isRightBranch) {
    let mOpts = this.mutationOptions;
    let tOpts = treeOptions;
    return {
      canvas: tOpts.canvas,
      depth: tOpts.depth - 1,
      angle: isRightBranch
        ? tOpts.angle +
            randomBetween(mOpts.minRightAngle, mOpts.maxRightAngle)
        : tOpts.angle -
            randomBetween(mOpts.minLeftAngle, mOpts.maxLeftAngle),
      height: tOpts.height * randomBetween(mOpts.minHeightChange, mOpts.maxHeightChange),
      thickness: tOpts.thickness * randomBetween(mOpts.minThicknessChange, mOpts.maxThicknessChange),
      delay: tOpts.delay,
      color: tOpts.color,
      rainbow: tOpts.rainbow,
      colorShiftRate: tOpts.colorShiftRate
    };
  }

  drawTree (treeOptions) {
    const opts = treeOptions;
    const self = this;
    if (opts.depth > 0 && this.alive) {
      if (opts.angle === undefined) {
        opts.angle = 180;
      }
      let branch = this.drawBranch(opts);
      let leftOptions = this.mutate(opts, false);
      let rightOptions = this.mutate(opts, true);
      leftOptions.startPoint = rightOptions.startPoint = branch.endPoint;
      leftOptions.color = rightOptions.color = branch.endColor;
      if (opts.delay) {
        setTimeout(function () {
          self.drawTree(leftOptions);
          self.drawTree(rightOptions);
        }, opts.delay);
      } else {
        this.drawTree(leftOptions);
        this.drawTree(rightOptions);
      }
    }
  }

  drawBranch (treeOptions) {
    let opts = treeOptions;
    let ctx = opts.canvas.getContext('2d');
    let endPoint = opts.startPoint.to(opts.angle, opts.height);
    let color, nextColor;
    if (opts.rainbow) {
      nextColor = opts.color.shiftHue(opts.colorShiftRate);
      let gradient = ctx.createLinearGradient(opts.startPoint.x, opts.startPoint.y, endPoint.x, endPoint.y);
      gradient.addColorStop(0, opts.color.toStyle());
      gradient.addColorStop(1, nextColor.toStyle());
      color = gradient;
    } else {
      nextColor = opts.color;
      color = opts.color.toStyle();
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = opts.thickness;
    ctx.beginPath();
    ctx.moveTo(opts.startPoint.x, opts.startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
    return {endPoint: endPoint, endColor: nextColor};
  }
}

module.exports = Topiary;
