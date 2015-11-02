    var treeOptions = {
      canvas: document.getElementById("canvas"),
      startPoint: new Vector2d(250, 500),
      color: Color.random(),
      height: 100,
      thickness: 10,
      depth: 14,
      rainbow: false,
      colorShiftRate: 30,
      delay: 200,
    };
    var mutationOptions = {
      minLeftAngle: 10,
      maxLeftAngle: 40,
      minRightAngle: 20,
      maxRightAngle: 40,
      minHeightChange: 0.6,
      maxHeightChange: 0.9,
      minThicknessChange: 0.6,
      maxThicknessChange: 0.9,
    };
    var tree = new Topiary(treeOptions, mutationOptions);
    var draw = function () {
      tree.kill();
      tree = new Topiary(treeOptions, mutationOptions);
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width, canvas.height);
      tree.draw();
    };

    var updatedMin = function() {
      if (mutationOptions.maxLeftAngle < mutationOptions.minLeftAngle) {
        mutationOptions.maxLeftAngle = mutationOptions.minLeftAngle;
      } 
      if (mutationOptions.maxRightAngle < mutationOptions.minRightAngle) {
        mutationOptions.maxRightAngle = mutationOptions.minRightAngle;
      } 
      if (mutationOptions.maxHeightChange < mutationOptions.minHeightChange) {
        mutationOptions.maxHeightChange = mutationOptions.minHeightChange;
      }
      if (mutationOptions.maxThicknessChange < mutationOptions.minThicknessChange) {
        mutationOptions.maxThicknessChange = mutationOptions.minThicknessChange;
      } 
    };

    var updatedMax = function() {
      if (mutationOptions.minLeftAngle > mutationOptions.maxLeftAngle) {
        mutationOptions.minLeftAngle = mutationOptions.maxLeftAngle;
      } 
      if (mutationOptions.minRightAngle > mutationOptions.maxRightAngle) {
        mutationOptions.minRightAngle = mutationOptions.maxRightAngle;
      }
      if (mutationOptions.minHeightChange > mutationOptions.maxHeightChange) {
        mutationOptions.minHeightChange = mutationOptions.maxHeightChange;
      } 
      if (mutationOptions.minThicknessChange > mutationOptions.maxThicknessChange) {
        mutationOptions.minThicknessChange = mutationOptions.maxThicknessChange;
      }
    };
    var button = {
      redraw: draw,
      changeColor: function() {
        treeOptions.color = Color.random();
        this.redraw();
      }
    };
    var gui = new dat.GUI();
    gui.add(treeOptions, 'height').min(0).step(5).max(200).onFinishChange(draw);
    gui.add(treeOptions, 'thickness').min(0).max(15).onFinishChange(draw);
    gui.add(treeOptions, 'depth').step(1).min(0).max(20).onFinishChange(draw);
    gui.add(mutationOptions, 'minLeftAngle').step(1).min(0).max(90).listen().onFinishChange(draw).onChange(updatedMin);
    gui.add(mutationOptions, 'maxLeftAngle').step(1).min(0).max(90).listen().onFinishChange(draw).onChange(updatedMax);
    gui.add(mutationOptions, 'minRightAngle').step(1).min(0).max(90).listen().onFinishChange(draw).onChange(updatedMin);
    gui.add(mutationOptions, 'maxRightAngle').step(1).min(0).max(90).listen().onFinishChange(draw).onChange(updatedMax);
    gui.add(mutationOptions, 'minHeightChange').min(0.5).max(1).listen().onFinishChange(draw).onChange(updatedMin);
    gui.add(mutationOptions, 'maxHeightChange').min(0.5).max(1).listen().onFinishChange(draw).onChange(updatedMax);
    gui.add(mutationOptions, 'minThicknessChange').min(0.5).max(1.25).listen().onFinishChange(draw).onChange(updatedMin);
    gui.add(mutationOptions, 'maxThicknessChange').min(0.5).max(1.25).listen().onFinishChange(draw).onChange(updatedMax);
    gui.add(treeOptions, 'rainbow').onFinishChange(draw);
    gui.add(treeOptions, 'colorShiftRate').min(5).step(5).max(180).onFinishChange(draw);
    gui.add(treeOptions, 'delay').min(0).step(5).max(500).onFinishChange(draw);
    gui.add(button, 'changeColor');
    gui.add(button, 'redraw');
    draw();