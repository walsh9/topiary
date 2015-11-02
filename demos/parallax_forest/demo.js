var createTreeLine = function (treeLineOptions) {
    var w, h;
    var treeOptions = treeLineOptions.treeOptions;
    var treeX = 0;
    var canvas = document.createElement('canvas');
    w = canvas.width = treeLineOptions.width;
    h = canvas.height = treeLineOptions.height;
    treeOptions.canvas = canvas;
    treeOptions.delay = 100;
    var baseHeight = treeOptions.height;
    while (treeX < canvas.width) {
        currentTreeOptions = treeOptions;
        currentTreeOptions.startPoint = (new Vector2d(treeX, canvas.height));
        currentTreeOptions.height = baseHeight * _Math.randomBetween(0.8, 1.2);
        tree = new  Topiary(currentTreeOptions);
        tree.draw(currentTreeOptions);
        treeX += treeLineOptions.spacing * _Math.randomBetween(1, 1.8);
    }
    return canvas;
};

var fillWithRandomGradient = function(canvas) {
    var ctx = canvas.getContext("2d");

    var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0, Color.random().toStyle());
    gradient.addColorStop(1, Color.random().toStyle());

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0, canvas.width, canvas.height);
};

var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d');

var sky = document.createElement('canvas');
sky.width = canvas.width;
sky.height = canvas.height;
fillWithRandomGradient(sky);

var treeColor = Color.random();
var layer1 = createTreeLine({
    width:  canvas.width + canvas.width / 12,
    height: canvas.height,
    spacing: 30,
    treeOptions: {
        height: 40,
        thickness: 2,
        depth: 6,
        color: treeColor
    }
});

treeColor = treeColor.darker(10);
var layer2 = createTreeLine({
    width:  canvas.width + canvas.width / 9,
    height: canvas.height,
    spacing: 60,
    treeOptions: {
        height: 60,
        thickness: 4,
        depth: 8,
        color: treeColor
    }
});

treeColor = treeColor.darker(10);
var layer3 = createTreeLine({
    width:  canvas.width + canvas.width / 6,
    height: canvas.height,
    spacing: 100,
    treeOptions: {
        height: 80,
        thickness: 6,
        depth: 10,
        color: treeColor
    }
});

treeColor = treeColor.darker(10);
var layer4 = createTreeLine({
    width:  canvas.width + canvas.width / 4,
    height: canvas.height,
    spacing: 150,
    treeOptions: {
        height: 100,
        thickness: 8,
        depth: 14,
        color: treeColor
    }
});



var draw = function() {
    ctx.drawImage(sky, 0, 0);
    ctx.drawImage(layer1, 0 - mouseX/12, 0);
    ctx.drawImage(layer2, 0 - mouseX/9, 0);
    ctx.drawImage(layer3, 0 - mouseX/6, 0);
    ctx.drawImage(layer4, 0 - mouseX/4, 0);
};

var mouseX = 0;
canvas.addEventListener("mousemove", function (e) {
    e = e || window.event; // IE-ism
    mouseX = e.clientX - e.target.offsetLeft;
    mouseY = e.clientY - e.target.offsetTop;
}, false);

var timeStep = (1 / 60) * 1000;
var speed = 0.3333333333;
var update = function (delta) {
    // nothing for now
};
var currentTime = Date.now();
var main = function () {
    var newTime = Date.now();
    var frameTime = newTime - currentTime;
    var delta;
    currentTime = newTime;
    while (frameTime > 0) {
        delta = Math.min(frameTime, timeStep);
        update(delta);
        frameTime -= delta;
    }
    draw();
    requestAnimationFrame(main);
};

main();