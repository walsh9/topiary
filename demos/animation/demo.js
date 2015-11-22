var HEIGHT = 0
var THICKNESS = 1
var HUE = 2
var SATURATION = 3
var LIGHTNESS = 4
var LEFT_ANGLE = 5
var RIGHT_ANGLE = 6
var HEIGHT_CHANGE = 7
var THICKNESS_CHANGE = 8

var nonRandomTree = function(array) {
  var canvas = document.getElementById("canvas");
  var treeOptions = {
    canvas: canvas,
    startPoint: new Vector2d(canvas.width / 2 , canvas.height),
    color: new Color(Math.floor(array[HUE] * 360), 
                     Math.floor(array[SATURATION] * 50 + 50),  
                     Math.floor(array[LIGHTNESS] * 50 + 50)),
    height:    array[HEIGHT] * 100 + 50,
    thickness: array[THICKNESS] * 8 + 2,
    depth: 11,
    rainbow: false,
    colorShiftRate: 0,
    delay: 0,
  };
  var mutationOptions = {
    minLeftAngle: array[LEFT_ANGLE] * 90,
    maxLeftAngle: array[LEFT_ANGLE] * 90,
    minRightAngle: array[RIGHT_ANGLE] * 90,
    maxRightAngle: array[RIGHT_ANGLE] * 90,
    minHeightChange: array[HEIGHT_CHANGE] * 0.1 + 0.7,
    maxHeightChange: array[HEIGHT_CHANGE] * 0.1 + 0.7,
    minThicknessChange: array[THICKNESS_CHANGE] * 0.1 + 0.7,
    maxThicknessChange: array[THICKNESS_CHANGE] * 0.1 + 0.7,
  };
  return new Topiary(treeOptions, mutationOptions);
}

var clamp = function(n, min, max) {
  if (min === undefined) {min = 0};
  if (max === undefined) {max = 1};
  if (n < min) {return min};
  if (n > max) {return max};
  return n;
}

var NoiseGenerator = function(min, max) {
  this.min = min;
  this.max = max;
  this.prev = this.random();
  this.current = this.smooth(this.prev, this.random());
}

NoiseGenerator.prototype.smooth = function(x, y) {
  return clamp(0.5 * (x + y), this.min, this.max); 
}

NoiseGenerator.prototype.random = function() {
  return clamp((Math.random() * (this.max - this.min) + this.min), this.min, this.max);
}

NoiseGenerator.prototype.next = function() {
  this.prev = this.current;
  this.current = this.smooth(this.prev, this.random());
  return this.current;
}

var arrayOfNoiseGenerators = function(num, min, max) {
  var noiseGenerators = []
  for (var i = 0; i < num; i++) {
    noiseGenerators[i] = new NoiseGenerator(min, max);
  }
  return noiseGenerators;
}


var SinGenerator = function(freq, amp) {
  this.amp = amp;
  this.freq = freq;
  this.x = Math.random() * (Math.PI / 2);
}

SinGenerator.prototype.next = function() {
  this.x += this.freq;
  return Math.sin(this.x) * this.amp;
}

var arrayOfSinGenerators = function(num, freq, amp) {
  var sinGenerators = []
  for (var i = 0; i < num; i++) {
    sinGenerators[i] = new SinGenerator(freq, amp);
  }
  return sinGenerators;
}

var arrayOfRandomFloats = function(num) {
  var floats = []
  for (var i = 0; i < num; i++) {
    floats[i] = Math.random();
  }
  return floats;
}

var change = function(array, waveGenArray, waveGenArray2) {
  for (var i = 0; i < array.length; i++) {
    array[i] += waveGenArray[i].next();
    array[i] += waveGenArray2[i].next();
    array[i] = clamp(array[i]);
  };
  return array;
}

var sinGens = arrayOfSinGenerators(9, 0.04, 0.01);
var noiseGens = arrayOfNoiseGenerators(9, -0.01, 0.01);
var seed = arrayOfRandomFloats(9);

var draw = function () {
  tree = nonRandomTree(change(seed, sinGens, noiseGens));
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.fillstyle = "black"
  ctx.fillRect(0,0,canvas.width, canvas.height);
  tree.draw();
};

setInterval(draw, 50)

