'use strict';

var colors = ["Red", "Black", "Yellow", "Blue"];

var getTileId = function(color, number, instance) {
  var colorIndex = typeof color === "number" ? Math.floor(color) : colors.indexOf(color);
  
  if(colorIndex < 0 || colorIndex > 3) {
    throw new Error("Invalid color: " + color);
  }
  
  var numberIndex = number === "Joker" ? 13 : number - 1;
  if(numberIndex < 0 || numberIndex > 13) {
    throw new Error("Invalid number: " + number);
  }

  return numberIndex * 8 + instance * 4 + colorIndex;
}

module.exports = {
  colors: colors,
  getTileId: getTileId
};