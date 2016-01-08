'use strict';

class RummikubBoard {
  constructor() {
    this.tiles = [];
    this.players = [];
    this.remainingTiles = getAllTiles();
  }
  
  testChanges(player, tiles) {
    let sets = extractSets(tiles);
  
    for(let set of sets) {
      if(!testSet(set))
        return { valid: false };
    }

    return { valid: true };
  }
  
  applyChanges(player, tiles) {    
    this.tiles = tiles; 
  }
}

module.exports = RummikubBoard;

function extractSets(tiles) {
  let rows = tiles.reduce((result, tile) => {
    var row = result[tile.y] || (result[tile.y] = []);
    
    row[tile.x] = tile;
    
    return result;
  }, []);
  
  let sets = rows.reduce((result, row) => {
    let set = null;
    
    row.forEach(tile => {
        if(set && set[set.length - 1].x != tile.x - 1) {
        result.push(set);
        set = null;
      }
      
      if(!set)
        set = [];
        
      set.push(tile);     
    });
    
    if(set)
      result.push(set);
      
    return result;
  }, []);
    
  return sets;
}

function testSet(set) {
  if(set.length < 3){
    return false;
  }
  
  let singleValue = true;
  let sequential = true;  
  let setColors = {};
  let prevValue = null;
  
  set.forEach(tile => {
    if(prevValue != null) {
      if(singleValue && prevValue !== tile.value)
        singleValue = false;
        
      if(sequential && prevValue !== tile.value - 1)
        sequential = false;
    }
    
    setColors[tile.color] = (setColors[tile.color] || 0) + 1;
    
    prevValue = tile.value;
  });
  
  var colorCount = Object.keys(setColors).length;  

  return (singleValue && colorCount === set.length) ||
    (sequential && colorCount === 1);
}

function getAllTiles() {
  var tiles = [];
  
  ['r','y','b','k'].forEach(color => {
    [1,2,3,4,5,6,7,8,9,10,11,12,13].forEach(value => {
      tiles.push({ color: color, value: value, instance: 0 });
      tiles.push({ color: color, value: value, instance: 1 });
    });
  });
  
  return tiles;
}