# to·pi·ar·y
/ˈtōpēˌerē/ 

noun

1. A shrub or tree clipped or trimmed into fantastic shapes.

## Description

A JavaScript module for creating simple procedurally generated trees.

## Demos

* [Tree Generator with Options GUI](http://walsh9.github.io/topiary/demos/generator/index.html)
* [Parallax Forest](http://walsh9.github.io/topiary/demos/parallax_forest/index.html)

## Usage

###example.html

```html
<script src="topiary.js">
<canvas id="canvas" width="500" height="500">
<script src="example.js">
```

###example.js

```javascript
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
    tree.draw()
```

## License

© Matt Walsh 2015, released under the MIT License