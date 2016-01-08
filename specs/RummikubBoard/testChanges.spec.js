/* global describe, it */
'use strict';

let RummikubBoard = require('../../src/RummikubBoard');
let chai = require('chai');
let expect = chai.expect;

describe('RummikubBoard', () => {
  describe('testChanges', () => {
    it('should return valid == true if no changes are made board is empty', () => {
      var board = new RummikubBoard();
      var tiles = board.tiles;
      var result = board.testChanges({}, tiles);
      
      expect(result.valid).to.be.true;
    });
            
    it('should return valid == true if board has multiple valid sets', () => {
      var board = new RummikubBoard();
      
      var tiles = [
        { x: 0, y: 0, value: 1, color: 'y' },
        { x: 1, y: 0, value: 2, color: 'y' },
        { x: 2, y: 0, value: 3, color: 'y' },
        { x: 3, y: 0, value: 4, color: 'y' },
        { x: 4, y: 0, value: 5, color: 'y' },
        { x: 5, y: 0, value: 6, color: 'y' },
        { x: 6, y: 1, value: 11, color: 'r' },
        { x: 1, y: 1, value: 11, color: 'y' },
        { x: 2, y: 1, value: 11, color: 'b' },
        { x: 3, y: 1, value: 11, color: 'k' },
        { x: 5, y: 1, value: 3, color: 'b' },
        { x: 6, y: 1, value: 4, color: 'b' },
        { x: 7, y: 1, value: 5, color: 'b' }
       ];
            
      var result = board.testChanges({}, tiles);
      expect(result.valid).to.be.true;
    });
    
    it('should return valid == false if board has set smaller than three tiles', () => {
      var board = new RummikubBoard();
      
      var tiles = [
        { x: 0, y: 0, value: 1, color: 'r' }
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