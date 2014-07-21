var expect = require('chai').expect;
var TicTacToe = require('../lib/tictactoe');

describe('TicTacToe', function() {
	
	var ttt = new TicTacToe();
	
	// Illegal move
	// ============
	
	describe('init()', function() {

		it('should return true', function() {

			expect(ttt.init()).to.be.true;
		});
	});
	
	describe('TicTacToe()', function() {

		it('board should be initialised', function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY]
			);
		});		
	});

	describe('xPlay()', function() {

		it('Play 1 should return false (out of range)', function() {
			
			expect(ttt.xPlay(10)).to.be.false;
		});		
	});

	describe('TicTacToe()', function() {

		it('board should still be empty', function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY]
			);
		});		
	});

	describe('TicTacToe()', function() {

		it('Play 1 should leave state ERROR', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.ERROR);
		});		
	});
		
	describe('TicTacToe()', function() {

		it('Play 1 should set error state OUT_OF_RANGE', function() {
			
			expect(ttt.error).to.equal(ttt.ERROR.OUT_OF_RANGE);
		});		
	});
	
	// Clear the error and continue play.
	
	describe('clearError()', function() {

		it('clearError() should return true', function() {
			
			expect(ttt.clearError()).to.be.true;
		});		
	});

	describe('TicTacToe()', function() {

		it('clearError() should leave state WAITING_X', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.WAITING_X);
		});		
	});
		
	describe('TicTacToe()', function() {

		it('clearError should set error state OK', function() {
			
			expect(ttt.error).to.equal(ttt.ERROR.OK);
		});		
	});
		
	// Game to draw
	// ============
	
	describe('init()', function() {

		it('should return true', function() {

			expect(ttt.init()).to.be.true;
		});
	});
	
	describe('TicTacToe()', function() {

		it('board should be initialised', function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY]
			);
		});		
	});

	// Play 1
	// ------
		
	describe('xPlay()', function() {

		it('Move 1 should return true', function() {
			
			expect(ttt.xPlay(1)).to.be.true;
		});		
	});

	describe('TicTacToe()', function() {

		it("board should show first play, inc nought's play", function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.CROSS,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY]);
		});		
	});

	describe('TicTacToe()', function() {

		it('Move 1 should leave state WAITING_X', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.WAITING_X);
		});		
	});
		
	// Play 2
	// ------
		
	describe('xPlay()', function() {

		it('Play 2 should return true', function() {
			
			expect(ttt.xPlay(3)).to.be.true;
		});		
	});

	describe('TicTacToe()', function() {

		it("board should show play 2, inc nought's play", function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY]);
		});		
	});

	describe('TicTacToe()', function() {

		it('Play 2 should leave state WAITING_X', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.WAITING_X);
		});		
	});
		
	// Play 3
	// ------
		
	describe('xPlay()', function() {

		it('Play 3 should return true', function() {
			
			expect(ttt.xPlay(8)).to.be.true;
		});		
	});

	describe('TicTacToe()', function() {

		it("board should show play 3, inc nought's play", function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.EMPTY]);
		});		
	});
		
	describe('TicTacToe()', function() {

		it('Play 3 should leave state WAITING_X', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.WAITING_X);
		});		
	});
		
	// Play 4
	// ------
		
	describe('xPlay()', function() {

		it('Play 4 should return true', function() {
			
			expect(ttt.xPlay(6)).to.be.true;
		});		
	});

	describe('TicTacToe()', function() {

		it("board should show play 4, inc nought's play", function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT]);
		});		
	});
		
	describe('TicTacToe()', function() {

		it('Play 4 should leave state WAITING_X', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.WAITING_X);
		});		
	});
		
	// Play 5
	// ------
		
	describe('xPlay()', function() {

		it('Play 5 should return true', function() {
			
			expect(ttt.xPlay(7)).to.be.true;
		});		
	});

	describe('TicTacToe()', function() {

		it("board should show play 5, inc nought's play", function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT]);
		});		
	});
		
	describe('TicTacToe()', function() {

		it('Play 5 should leave state DRAW', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.DRAW);
		});		
	});

	// Game to computer win
	// ====================

	describe('init()', function() {

		it('should return true', function() {

			expect(ttt.init()).to.be.true;
		});
	});
	
	describe('TicTacToe()', function() {

		it('board should be initialised', function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY]
			);
		});		
	});

	// Play 1
	// ------
		
	describe('xPlay()', function() {

		it('Move 1 should return true', function() {
			
			expect(ttt.xPlay(1)).to.be.true;
		});		
	});

	describe('TicTacToe()', function() {

		it("board should show first play, inc nought's play", function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.CROSS,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY]);
		});		
	});

	describe('TicTacToe()', function() {

		it('Move 1 should leave state WAITING_X', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.WAITING_X);
		});		
	});
		
	// Play 2
	// ------
		
	describe('xPlay()', function() {

		it('Play 2 should return true', function() {
			
			expect(ttt.xPlay(3)).to.be.true;
		});		
	});

	describe('TicTacToe()', function() {

		it("board should show play 2, inc nought's play", function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY]);
		});		
	});

	describe('TicTacToe()', function() {

		it('Play 2 should leave state WAITING_X', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.WAITING_X);
		});		
	});
		
	// Play 3
	// ------
		
	describe('xPlay()', function() {

		it('Play 3 should return true', function() {
			
			expect(ttt.xPlay(9)).to.be.true;
		});		
	});

	describe('TicTacToe()', function() {

		it("board should show play 3, inc nought's play", function() {
			
			expect(ttt.board).to.have.members([
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.CROSS,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.EMPTY,
				ttt.SQUARE.NOUGHT,
				ttt.SQUARE.CROSS]);
		});		
	});
		
	describe('TicTacToe()', function() {

		it('Play 3 should leave state O_WON', function() {
			
			expect(ttt.state).to.equal(ttt.STATE.O_WON);
		});		
	});

});