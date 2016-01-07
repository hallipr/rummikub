/* global describe, it */
'use strict';

let rummikub = require('../src/rummikub');
let chai = require('chai');
let expect = chai.expect;

describe('rummikub', () => {
  describe('testBoard', () => {
    it('should return true if board is empty', () => {
      var board = rummikub.createBoard();
      var result = rummikub.testBoard(board);
      
      expect(result).to.be.true;
    });
    
    it('should return false if board has set smaller than three tiles', () => {
      var board = rummikub.createBoard();
      
      board.tiles = [
        { x: 0, y: 0, value: 1, color: 'r' }
      ];
            
      var result = rummikub.testBoard(board);      
      expect(result).to.be.false;
    });
    
    it('should return false if set has one number and duplicated colors', () => {
      var board = rummikub.createBoard();
      
      board.tiles = [
        { x: 0, y: 0, value: 1, color: 'r' },
        { x: 1, y: 0, value: 1, color: 'y' },
        { x: 2, y: 0, value: 1, color: 'b' },
        { x: 3, y: 0, value: 1, color: 'b' }
       ];
            
      var result = rummikub.testBoard(board);      
      expect(result).to.be.false;
    });
      
    it('should return false if set has multiple nonsequential numbers', () => {
      var board = rummikub.createBoard();
      
      board.tiles = [
        { x: 0, y: 0, value: 1, color: 'r' },
        { x: 1, y: 0, value: 2, color: 'r' },
        { x: 2, y: 0, value: 4, color: 'r' },
        { x: 3, y: 0, value: 5, color: 'r' }
       ];
            
      var result = rummikub.testBoard(board);      
      expect(result).to.be.false;
    });
    
    it('should return false if set has multiple numbers and multiple colors', () => {
      var board = rummikub.createBoard();
      
      board.tiles = [
        { x: 0, y: 0, value: 1, color: 'r' },
        { x: 1, y: 0, value: 2, color: 'y' },
        { x: 2, y: 0, value: 3, color: 'b' }
       ];
            
      var result = rummikub.testBoard(board);      
      expect(result).to.be.false;
    });
    
    it('should return true if board has multiple valid sets', () => {
      var board = rummikub.createBoard();
      
      board.tiles = [
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
            
      var result = rummikub.testBoard(board);      
      expect(result).to.be.true;
    });
  });
})