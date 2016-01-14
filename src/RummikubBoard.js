'use strict';

let BoardChangeError = require("./BoardChangeError");
let utils = require("./utils");

class RummikubBoard {
  constructor() {
    this.players = [];
    this.remainingTiles = getAllTiles();
    this.playedTiles = [];
  }

  testChanges(player, tiles) {
    let sets = extractSets(tiles);

    for (let set of sets) {
      if (!testSet(set))
        return { valid: false };
    }

    return { valid: true };
  }

  applyChanges(player, tiles) {
    var testResults = this.testChanges(player, tiles);
    if (!testResults.valid) {
      throw new BoardChangeError(testResults)
    }
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
      if (set && set[set.length - 1].x != tile.x - 1) {
        result.push(set);
        set = null;
      }

      if (!set)
        set = [];

      set.push(tile);
    });

    if (set)
      result.push(set);

    return result;
  }, []);

  return sets;
}

function testSet(set) {
  if (set.length < 3) {
    return false;
  }

  let singleValue = true;
  let sequential = true;
  let setColors = {};
  let previousNonJoker = null;
  let precedingJokers = 0;
  let nonJokerCount = 0;

  for(let tile of set) {
    // if we've seen a non joker, test single value and sequential
    if (previousNonJoker != null) {
      if (singleValue && previousNonJoker !== tile.value)
        singleValue = false;
      
      // the distance between the values of sequential tiles is increased by 1 by each preceeding joker
      if (sequential && previousNonJoker !== tile.value - 1 - precedingJokers)
        sequential = false;
    }
    
    if(tile.number == "Joker") {
        precedingJokers += 1;
    } else {
        previousNonJoker = tile.value;
        precedingJokers = 0;
        nonJokerCount += 1;
        setColors[tile.color] = (setColors[tile.color] || 0) + 1;
    }
  }

  var colorCount = Object.keys(setColors).length;

  return (singleValue && colorCount === nonJokerCount) ||
    (sequential && colorCount === 1);
}

function getAllTiles() {
  var colors = ['Red', 'Black', 'Yellow', 'Blue'];
  var tiles = flatten(range(1,14).map(n => 
    flatten(range(0,2).map(i => 
      range(0,4).map(c => { 
        return { 
          "id": utils.getTileId(c, n, i), 
          "color": colors[c],
          "number": n === 14 ? "Joker" : n, 
          "instance": i
        };
      })
    ))
  ));
  
  return tiles.slice(0, 106);
}

function range(start, count, inc) {
  inc = inc || 1;
  var items = [];
  
  for (let i = 0, next = start; i < count; i++ , next += inc) {
    items.push(next);
  }
  
  return items;
}

function flatten(arrays) {
  return [].concat.apply([], arrays);
}