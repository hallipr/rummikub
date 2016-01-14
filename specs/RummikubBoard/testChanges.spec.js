/* global describe, it */
'use strict';

let RummikubBoard = require('../../src/RummikubBoard');
let utils = require('../../src/utils.js');
let chai = require('chai');
let expect = chai.expect;

describe('RummikubBoard', () => {
  describe('testChanges', () => {
    it('should return valid == true if no changes are made', () => {
      var board = new RummikubBoard();
      
      board.playedTiles = [
        { x: 0, y: 0, id: utils.getTileId("Red", 1, 1) },
        { x: 1, y: 0, id: utils.getTileId("Red", 2, 1) },
        { x: 2, y: 0, id: utils.getTileId("Red", 3, 1) },
        { x: 3, y: 0, id: utils.getTileId("Red", 4, 1) }
      ];
      
      var tiles = board.playedTiles;
      var result = board.testChanges({}, tiles);
      
      expect(result.valid).to.be.true;
    });
            
    it('should return valid == true if board has multiple valid sets', () => {
      var board = new RummikubBoard();
      
      var tiles = [
        { x: 0, y: 0, id: utils.getTileId("Red", 1, 1) },
        { x: 1, y: 0, id: utils.getTileId("Red", 2, 1) },
        { x: 2, y: 0, id: utils.getTileId("Red", 3, 1) },
        { x: 3, y: 0, id: utils.getTileId("Red", 4, 1) },
        { x: 4, y: 0, id: utils.getTileId("Red", 5, 1) },
        { x: 5, y: 0, id: utils.getTileId("Red", 6, 1) },
        { x: 8, y: 0, id: utils.getTileId("Black", 1, 1) },
        { x: 9, y: 0, id: utils.getTileId("Red", 1, 2) },
        { x: 10, y: 0, id: utils.getTileId("Blue", 1, 1) },
        { x: 11, y: 0, id: utils.getTileId("Yellow", 1, 1) },
        { x: 4, y: 2, id: utils.getTileId("Blue", 11, 1) },
        { x: 5, y: 2, id: utils.getTileId("Blue", 12, 1) },
        { x: 6, y: 2, id: utils.getTileId("Blue", 13, 1) }
      ];  
      
      var result = board.testChanges({}, tiles);
      expect(result.valid).to.be.true;
    });
    
                
    it('should return valid == true if board has jokers', () => {
      var board = new RummikubBoard();
      
      var tiles = [
        { x: 0, y: 0, id: utils.getTileId("Red", 1, 1) },
        { x: 1, y: 0, id: utils.getTileId("Red", 2, 1) },
        { x: 2, y: 0, id: utils.getTileId("Red", 3, 1) },
        { x: 3, y: 0, id: utils.getTileId("Black", "Joker", 1) },
        { x: 4, y: 0, id: utils.getTileId("Red", 5, 1) },
        { x: 5, y: 0, id: utils.getTileId("Red", 6, 1) },
        
        { x: 8, y: 0, id: utils.getTileId("Black", 1, 1) },
        { x: 9, y: 0, id: utils.getTileId("Red", 1, 2) },
        { x: 10, y: 0, id: utils.getTileId("Red", "Joker", 1) },
        
        { x: 4, y: 2, id: utils.getTileId("Blue", 11, 1) },
        { x: 5, y: 2, id: utils.getTileId("Blue", 12, 1) },
        { x: 6, y: 2, id: utils.getTileId("Blue", 13, 1) }
      ];  
      
      var result = board.testChanges({}, tiles);
      expect(result.valid).to.be.true;
    });
    
    it('should return valid == false if board has set smaller than three tiles', () => {
      var board = new RummikubBoard();
      
      var tiles = [
        { x: 0, y: 0, id: utils.getTileId("Red", 1, 1) }
      ];
            
      var result = board.testChanges({}, tiles);
      expect(result.valid).to.be.false;
    });
    
    it('should return valid == false if set has one number and duplicated colors', () => {
      var board = new RummikubBoard();
      
      var tiles = [
        { x: 0, y: 0, value: 1, color: 'r' },
        { x: 1, y: 0, value: 1, color: 'y' },
        { x: 2, y: 0, value: 1, color: 'b' },
        { x: 3, y: 0, value: 1, color: 'b' }
       ];
            
      var result = board.testChanges({}, tiles);
      expect(result.valid).to.be.false;
    });
      
    it('should return valid == false if set has multiple nonsequential numbers', () => {
      var board = new RummikubBoard();
      
      var tiles = [
        { x: 0, y: 0, value: 1, color: 'r' },
        { x: 1, y: 0, value: 2, color: 'r' },
        { x: 2, y: 0, value: 4, color: 'r' },
        { x: 3, y: 0, value: 5, color: 'r' }
       ];
            
      var result = board.testChanges({}, tiles);
      expect(result.valid).to.be.false;
    });
    
    it('should return valid == false if set has multiple numbers and multiple colors', () => {
      var board = new RummikubBoard();
      
      var tiles = [
        { x: 0, y: 0, value: 1, color: 'r' },
        { x: 1, y: 0, value: 2, color: 'y' },
        { x: 2, y: 0, value: 3, color: 'b' }
       ];
            
      var result = board.testChanges({}, tiles);
      expect(result.valid).to.be.false;
    });
  });
})

function getTileId(color, number, instance) {
  return 
}