var _Math = function() {
    return {
        randomBetween: function(min, max) {
            return Math.random() * (max - min) + min;
        },
        mod: function(x, y) {
            return ((x % y) + y) % y;
        },
    };
}();