var Topiary = function(treeOptions, mutationOptions) {
    this.alive = true;
    var self = this;
    var mutate = function(treeOptions, isRightBranch) {
        var mOpts = self.mutationOptions;
        var tOpts = treeOptions;
        return {
            canvas: tOpts.canvas,
            depth: tOpts.depth - 1,
            angle: isRightBranch ? 
                tOpts.angle + 
                    _Math.randomBetween(mOpts.minRightAngle, mOpts.maxRightAngle) : 
                tOpts.angle - 
                    _Math.randomBetween(mOpts.minLeftAngle, mOpts.maxLeftAngle),
            height: tOpts.height * _Math.randomBetween(mOpts.minHeightChange, mOpts.maxHeightChange),
            thickness:  tOpts.thickness * _Math.randomBetween(mOpts.minThicknessChange, mOpts.maxThicknessChange), 
            delay: tOpts.delay,
            color: tOpts.color,
            rainbow: tOpts.rainbow,
            colorShiftRate: tOpts.colorShiftRate
        };
    };

    var drawTree = function(treeOptions) {
        var opts = treeOptions;
        if (opts.depth > 0 && self.alive) {
            if (opts.angle === undefined) {
                opts.angle = 180;
            }
            var branch = drawBranch(opts);
            var leftOptions = mutate(opts, false);
            var rightOptions = mutate(opts, true);
            leftOptions.startPoint = rightOptions.startPoint = branch.endPoint;
            leftOptions.color = rightOptions.color = branch.endColor;
            if (opts.delay) {
                var timeout = window.setTimeout(function () {
                    drawTree(leftOptions);
                    drawTree(rightOptions);
                }, opts.delay);
            } else {
                drawTree(leftOptions);
                drawTree(rightOptions);
            }
        }
    };

    var drawBranch = function(treeOptions) {
        var opts = treeOptions;
        var ctx = opts.canvas.getContext("2d");
        var endPoint = opts.startPoint.to(opts.angle, opts.height);
        var color, nextColor;
        if (opts.rainbow) {
            nextColor = opts.color.shiftHue(opts.colorShiftRate);
            var gradient = ctx.createLinearGradient(opts.startPoint.x, opts.startPoint.y, endPoint.x, endPoint.y);
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
    };

    var mutationDefaults = {
      minLeftAngle: 10,
      maxLeftAngle: 40,
      minRightAngle: 10,
      maxRightAngle: 40,
      minHeightChange: 0.6,
      maxHeightChange: 0.9,
      minThicknessChange: 0.6,
      maxThicknessChange: 0.9,
    };

    this.treeOptions = treeOptions;
    this.mutationOptions = mutationOptions || mutationDefaults;
    this.draw = function() { drawTree(this.treeOptions); };
    this.kill = function() { self.alive = false; };

};
