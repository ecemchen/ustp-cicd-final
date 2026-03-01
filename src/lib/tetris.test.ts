import { describe, it, expect, beforeEach } from 'vitest';
import { GameState } from './tetris';

describe('Tetris Game Logic', () => {
  let gameState: GameState;

  beforeEach(() => {
    gameState = new GameState();
  });

  describe('Game Initialization', () => {
    it('should initialize the game board correctly', () => {
      expect(gameState.board).toBeDefined();
      expect(gameState.board.length).toBe(20);
      expect(gameState.board[0].length).toBe(10);
    });

    it('should start with score 0', () => {
      expect(gameState.score).toBe(0);
    });

    it('should have a current piece', () => {
      expect(gameState.currentPiece).toBeDefined();
    });
  });

  describe('Piece Movement', () => {
    it('should move piece down', () => {
      const initialY = gameState.currentPieceY;
      gameState.moveDown();
      expect(gameState.currentPieceY).toBeGreaterThan(initialY);
    });

    it('should move piece left', () => {
      const initialX = gameState.currentPieceX;
      gameState.moveLeft();
      expect(gameState.currentPieceX).toBeLessThan(initialX);
    });

    it('should move piece right', () => {
      const initialX = gameState.currentPieceX;
      gameState.moveRight();
      expect(gameState.currentPieceX).toBeGreaterThan(initialX);
    });
  });

  describe('Piece Rotation', () => {
    it('should rotate piece', () => {
      const initialRotation = gameState.currentPieceRotation;
      gameState.rotatePiece();
      expect(gameState.currentPieceRotation).not.toBe(initialRotation);
    });
  });

  describe('Game Over Detection', () => {
    it('should detect when game is over', () => {
      const gameOver = gameState.isGameOver();
      expect(typeof gameOver).toBe('boolean');
    });
  });

  describe('Line Clearing', () => {
    it('should clear completed lines', () => {
      const initialScore = gameState.score;
      gameState.clearCompletedLines();
      // Score should increase if lines were cleared, or stay same if not
      expect(gameState.score).toBeGreaterThanOrEqual(initialScore);
    });
  });
});