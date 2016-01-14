'use strict';

var colors = ["Red", "Black", "Yellow", "Blue"];

var getTileId = function(color, value, instance) {
  var colorIndex = typeof color === "number" ? Math.floor(color) : colors.indexOf(color);
  
  if(colorIndex < 0 || colorIndex > 3) {
    throw new Error("Invalid color: " + color);
  }
  
  if(value < 1 || value > 14) {
    throw new Error("Invalid value: " + value);
  }

  return (value - 1) * 8 + instance * 4 + colorIndex;
}

module.exports = {
  colors: colors,
  getTileId: getTileId
};