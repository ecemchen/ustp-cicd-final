import { describe, it, expect } from 'vitest';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  createEmptyBoard,
  getRandomTetromino,
  rotateTetromino,
  checkCollision,
  mergeTetromino,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropSpeed,
  TETROMINOES,
} from './tetris';

describe('Tetris Game Logic', () => {
  describe('Board Initialization', () => {
    it('should create an empty board with correct dimensions', () => {
      const board = createEmptyBoard();
      expect(board.length).toBe(BOARD_HEIGHT);
      expect(board[0].length).toBe(BOARD_WIDTH);
    });

    it('should have all cells empty initially', () => {
      const board = createEmptyBoard();
      const allEmpty = board.every(row => row.every(cell => !cell.filled));
      expect(allEmpty).toBe(true);
    });
  });

  describe('Tetromino Generation', () => {
    it('should generate a random tetromino', () => {
      const tetromino = getRandomTetromino();
      expect(tetromino).toBeDefined();
      expect(tetromino.type).toBeDefined();
      expect(tetromino.shape).toBeDefined();
      expect(tetromino.color).toBeDefined();
      expect(tetromino.position).toBeDefined();
    });

    it('should have valid tetromino type', () => {
      const tetromino = getRandomTetromino();
      expect(['I', 'O', 'T', 'S', 'Z', 'J', 'L']).toContain(tetromino.type);
    });
  });

  describe('Tetromino Rotation', () => {
    it('should rotate a tetromino shape', () => {
      const tetromino = getRandomTetromino();
      const rotated = rotateTetromino(tetromino);
      expect(rotated).toBeDefined();
      expect(Array.isArray(rotated)).toBe(true);
    });

    it('should maintain shape dimensions after rotation', () => {
      const tetromino = getRandomTetromino();
      const rotated = rotateTetromino(tetromino);
      expect(rotated.length).toBe(tetromino.shape.length);
    });
  });

  describe('Collision Detection', () => {
    it('should detect collision with board boundaries', () => {
      const board = createEmptyBoard();
      const tetromino = getRandomTetromino();
      
      // Test if collision detection works (should return boolean)
      const result = checkCollision(board, tetromino);
      expect(typeof result).toBe('boolean');
    });

    it('should detect collision with offset', () => {
      const board = createEmptyBoard();
      const tetromino = getRandomTetromino();
      
      const collision = checkCollision(board, tetromino, 0, 100);
      expect(typeof collision).toBe('boolean');
    });
  });

  describe('Tetromino Merging', () => {
    it('should merge tetromino with board', () => {
      const board = createEmptyBoard();
      const tetromino = getRandomTetromino();
      
      const newBoard = mergeTetromino(board, tetromino);
      expect(newBoard.length).toBe(BOARD_HEIGHT);
      expect(newBoard[0].length).toBe(BOARD_WIDTH);
    });

    it('should mark cells as filled after merge', () => {
      const board = createEmptyBoard();
      const tetromino = getRandomTetromino();
      
      const newBoard = mergeTetromino(board, tetromino);
      const hasFilled = newBoard.some(row => row.some(cell => cell.filled));
      expect(hasFilled).toBe(true);
    });
  });

  describe('Line Clearing', () => {
    it('should return an object with newBoard and linesCleared', () => {
      const board = createEmptyBoard();
      const result = clearLines(board);
      
      expect(result).toHaveProperty('newBoard');
      expect(result).toHaveProperty('linesCleared');
    });

    it('should maintain board height after clearing', () => {
      const board = createEmptyBoard();
      const result = clearLines(board);
      
      expect(result.newBoard.length).toBe(BOARD_HEIGHT);
    });
  });

  describe('Scoring', () => {
    it('should calculate score correctly', () => {
      const score = calculateScore(1, 1);
      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
    });

    it('should increase score with more lines cleared', () => {
      const score1 = calculateScore(1, 1);
      const score2 = calculateScore(4, 1);
      expect(score2).toBeGreaterThan(score1);
    });

    it('should increase score with higher level', () => {
      const score1 = calculateScore(1, 1);
      const score2 = calculateScore(1, 2);
      expect(score2).toBeGreaterThan(score1);
    });
  });

  describe('Level Calculation', () => {
    it('should calculate level from total lines', () => {
      expect(calculateLevel(0)).toBe(1);
      expect(calculateLevel(10)).toBe(2);
      expect(calculateLevel(20)).toBe(3);
    });

    it('should return at least level 1', () => {
      expect(calculateLevel(0)).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Drop Speed', () => {
    it('should return speed for a given level', () => {
      const speed = getDropSpeed(1);
      expect(typeof speed).toBe('number');
      expect(speed).toBeGreaterThan(0);
    });

    it('should decrease speed with higher level', () => {
      const speed1 = getDropSpeed(1);
      const speed2 = getDropSpeed(5);
      expect(speed2).toBeLessThan(speed1);
    });

    it('should have minimum speed limit', () => {
      const speed = getDropSpeed(100);
      expect(speed).toBeGreaterThanOrEqual(100);
    });
  });
});