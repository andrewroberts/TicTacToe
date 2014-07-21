// 345678901234567890123456789012345678901234567890123456789012345678901234567890

var out = console.log;
var assert = require('assert');
var util = require('util');

/** The TicTacToe Board Class.
 *
 * @constructor
 * @public
 */
 
var TicTacToe = function() {
	
	// Private Variables
	// =================

	var self = this;
	
	// TODO - Object enum.

	var EMPTY = '.',
		CROSS = 'X',
		NOUGHT = 'O',
		NUMBER_SQUARES = 9;
	 
	var board = [
		
		EMPTY, 
		EMPTY, 
		EMPTY,
		EMPTY,
		EMPTY,
		EMPTY,
		EMPTY,
		EMPTY,
		EMPTY
	];
		
	// The state of play from the computers (noughts) perspective.

	var rowStatus = {

		WON: 'The computer won',
		FULL: 'The squares in this row are full before the computer goes',
		SPACE: 'The computer found a space that did not block or win',
		BLOCK: 'The computer blocked a potential row',
		LOST: 'The computer lost'
	};

	// Get the three values from each of the eight rows in turn.
	
	var getEachRow = [
	
		[1, 2, 3], // top horiz 
		[4, 5, 6], // middle horiz
		[7, 8, 9], // bottom horiz
		[1, 4, 7], // left vert
		[2, 5, 8], // middle vert
		[3, 6, 9], // right vert
		[3, 5, 7], // diag 1
		[1, 5, 9]  // diag 2
	];
	
	var old_state;
	
	// Public API
	// ==========
	//	
	// The board - an array of chars for cross, nought and empty. The squares are numbered
	// thus:
	//
	//  1 | 2 | 3 
	//  ---------
	//  4 | 5 | 6 
	//  ---------
	//  7 | 8 | 9

	/** 
	 * Enum values for the squares in the board.
	 *
	 * @public
	 */
	 
	this.SQUARE = {
		
		EMPTY: EMPTY,
		CROSS: CROSS,
		NOUGHT: NOUGHT
	};

	/** 
	 * Number of squares in the game board.
	 *
	 * @public
	 */
	 
	this.NUMBER_OF_SQUARES = NUMBER_SQUARES;

	/** 
	 * The game board (a ptr to the local copy).
	 *
	 * @public
	 */

	this.board = board;

	/** 
	 * The status of the game. The user must check here after making a move
	 *  to know the new status of the game.
	 *
	 * @public
	 */
	
	this.STATE = {
			
		WAITING_X: 'Waiting for cross to make a move',
		X_WON: 'Crosses won',
		O_WON: 'Noughts won',
		DRAW: 'Draw',
		ERROR: 'Error see this.error'
	};
	
	this.state = this.STATE.WAITING_X;
	
	/** 
	 * An error has occured.
	 *
	 * @public
	 */
	
	this.ERROR = {
		
		OK: 'No errors',
		OUT_OF_RANGE: 'Arg is out of range',
		BAD_TYPE: 'Arg is of the wrong type',
		SQUARE_TAKEN: 'This square has already been used',
		GAME_FINISHED: 'The game is over, reset the board',
		INVALID_STATE: 'An unexpected event has occured'
	};
	
	this.error = this.ERROR.OK;
	
	/** 
	 * Initialise the object. This must be called before the game can start.
	 * 
	 * @params none
	 *
	 * @returns true if the board is available, false otherwise.
	 *
	 * @public
	 */
	 
	this.init = function() {
		
		var boardIndex;
		var functionName = 'TicTacToe.init()';
		
		for (boardIndex = 0, board.length = 0; 
			 boardIndex < NUMBER_SQUARES; 
			 boardIndex++) {
			
			board.push(EMPTY);
		}
		
		this.state = this.STATE.WAITING_X;	
		this.error = this.ERROR.OK;
		
		return true;
		
	}; // TicTacToe.init()

	/**
	 * Process a move by the user.
	 *
	 * @params {integer} the square id of the next move.
	 *
	 * @returns {boolean} - true is move ok, else false.
	 *
	 * @throws 
	 *
	 * @public
	 */
	
	this.xPlay = function (squareId) {
		
		var functionName = 'TicTacToe.set()',
			computerResult,
			boardIndex;
		
		// Check the state and args.
		
		if (this.state !== this.STATE.WAITING_X) {
		
			userError(this.ERROR.INVALID_STATE, 
					  functionName + ': Not waiting for X play');
					  
			return false;
		}
			   
		if (isNaN(squareId)) {
			
			userError(this.ERROR.BAD_TYPE, 
					  functionName + ': Arg has to be a number');
					  
			return false;
		}

		if (squareId < 1 || squareId > 9) {
			
			userError(this.ERROR.OUT_OF_RANGE, 
					  functionName + ': Number has to be between 1 and 9');
					  
			return false;
		}

		boardIndex = squareId - 1;

		if (board[boardIndex] !== EMPTY) {
		
			userError(this.ERROR.SQUARE_TAKEN);
			return false;
		}

		// Make the move.

		board[boardIndex] = CROSS;
		
		// Process the move and work out the computers move.
		
		if (userWon()) {
			
			return true;
		}
		
		if (draw()) {
			
			return true;
		}
		
		if (computerWon()) {
			
			return true;
		}
		
		if (blockedUser()) {
			
			draw();
			return true;
		}
		
		randomComputerMove();
		draw();
		
		return true;
		
	}; // TicTacToe.xPlay()

	/**
	 * Having dealt with an error, this allows the user to clear it.
	 *
	 * @returns {boolean} - true is move ok, else false.
	 *
	 * @public
	 */

	this.clearError = function() {
	
		this.error = this.ERROR.OK;
		this.state = old_state;
		return true;
	};

	// Private
	// =======

	/** 
	 * Check the whole board to see if the user has won, each row at a time.
	 *
	 * @returns {boolean} true is user won, else false.
	 *
	 * @private
	 */
	 
	function userWon() {
		
		if (checkRows(false, rowStatus.LOST)) {
			
			self.state = self.STATE.X_WON;
			return true;			
		}
		
		return false;
		
	} // userWon()

	/** 
	 * If all of the squares are now full there has been a draw.
	 *
	 * @returns {boolean} true if draw, else false.
	 *
	 * @private
	 */

	function draw() {
		
		if (!checkRows(false, rowStatus.SPACE)) {
			
			self.state = self.STATE.DRAW;
			return true;			
		}
		
		return false;
		
	} // draw()

	/** 
	 * Look for a win by the computer.
	 *
	 * @returns {boolean} true if computer won, else false.
	 *
	 * @private
	 */

	function computerWon() {
		
		if (checkRows(true, rowStatus.WON)) {
			
			self.state = self.STATE.O_WON;			
			return true;	
		}
		
		return false;

	} // computerWon()

	/** 
	 * Check if the computer can block a user's row.
	 *
	 * @returns {boolean} true if blocked, else false.
	 *
	 * @private
	 */

	function blockedUser() {
		
		return checkRows(true, rowStatus.BLOCK) ? true : false;
		
	} // blockedUser()

	/** 
	 * Nothing else to do so just fill a random empty square.
	 *
	 * @returns {boolean} true (shouldn't fail)
	 *
	 * @private
	 */

	function randomComputerMove() {
		
		var madeMove = false;
		
		// First grab the centre square if possible.
		
		if (board[4] === self.SQUARE.EMPTY) {
			
			board[4] = self.SQUARE.NOUGHT;
			madeMove = true;
			
		} else {
				
			madeMove = checkRows(true, rowStatus.SPACE);		
		}

		// This was the last option.
		assert(madeMove);
		
		self.state = self.STATE.WAITING_X;
		return true;			
	
	} // randomComputerMove()

	/**
	 */

	function checkRows(makeMove, findStatus) {				

		var foundStatus = false,
			row= [],
			rowIndex;
			
		for (rowIndex = 0; rowIndex < getEachRow.length; rowIndex++) {

			row = [
				board[getEachRow[rowIndex][0] - 1], 
				board[getEachRow[rowIndex][1] - 1], 
				board[getEachRow[rowIndex][2] - 1]
			];
						
		// TODO - Remove makeMove.						
						
			if (checkRow(row, makeMove) === findStatus) {

				foundStatus = true;			
				
				if (makeMove) {

						board[getEachRow[rowIndex][0] - 1] = row[0]; 
						board[getEachRow[rowIndex][1] - 1] = row[1]; 
						board[getEachRow[rowIndex][2] - 1] = row[2]; 
				}
				
				break;
			}
		}
		
		return foundStatus;

	} // checkRows()

	/** 
	* Use a lookup table to determine the computers response. This table 
	* determines the action to take by taking the top row of the board 
	* array, converting it into a bit field and using this bitfield to 
	* access the correction next element in the array, which gives it 
	* the new state and value for the top row.
	*
	* Convert the values in the row of the board into an offset into the
	* decision table.
	*
	* @params: 
	* 
	* @returns: 
	*
	*	WIN - The computer's move has won it the game.
	*	FULL - This row is already full.
	*	SPACE - The computer has filled a space with no result
	*	BLOCK - The computer has blocked a possible win by the user.
	*
	* @private
	*/

	function checkRow(row, makeMove) {

		var rowToNum = {

			'OOO': 0,
			'OO.': 1,
			'OOX': 2,
			'O.O': 3,
			'O..': 4,
			'O.X': 5,
			'OXO': 6,
			'OX.': 7,
			'OXX': 8,
			'.OO': 9,
			'.O.': 10,
			'.OX': 11,
			'..O': 12,
			'...': 13,
			'..X': 14,
			'.XO': 15,
			'.X.': 16,
			'.XX': 17,
			'XOO': 18,
			'XO.': 19,
			'XOX': 20,
			'X.O': 21,
			'X..': 22,
			'X.X': 23,
			'XXO': 24,
			'XX.': 25,
			'XXX': 26
		};

		var noughtMove = [

			[rowStatus.FULL,   0], //  0 - O O O 
			[rowStatus.WON,    0], //  1 - O O .
			[rowStatus.FULL,   2], //  2 - O O X
			[rowStatus.WON,    0], //  3 - O . O
			[rowStatus.SPACE,  1], //  4 - O . .
			[rowStatus.SPACE,  2], //  5 - O . X
			[rowStatus.FULL,   6], //  6 - O X O
			[rowStatus.SPACE,  6], //  7 - O X .
			[rowStatus.FULL,   8], //  8 - O X X
			[rowStatus.WON,    0], //  9 - . O O
			[rowStatus.SPACE,  1], // 10 - . O .
			[rowStatus.SPACE,  2], // 11 - . O X
			[rowStatus.SPACE,  3], // 12 - . . O
			[rowStatus.SPACE, 10], // 13 - . . .
			[rowStatus.SPACE,  5], // 14 - . . X
			[rowStatus.SPACE,  6], // 15 - . X O
			[rowStatus.SPACE,  7], // 16 - . X .
			[rowStatus.BLOCK,  8], // 17 - . X X
			[rowStatus.FULL,  18], // 18 - X O O
			[rowStatus.SPACE, 18], // 19 - X O .
			[rowStatus.FULL,  20], // 20 - X O X
			[rowStatus.SPACE, 18], // 21 - X . O
			[rowStatus.SPACE, 19], // 22 - X . .
			[rowStatus.BLOCK, 20], // 23 - X . X
			[rowStatus.FULL,  24], // 24 - X X O
			[rowStatus.BLOCK, 24], // 25 - X X .
			[rowStatus.LOST,  26]  // 26 - X X X
		];

		// Use the three square values for this row as a key into the rowToNum object 
		// to get an id number for this pattern. Then use this id as an index into the
		// noughtMove array to get nought's move and/or the state of play.
			
		var rowString = row[0] + row[1] + row[2];
			
		var moveResult = noughtMove[rowToNum[rowString]][0];

		if (makeMove) {
		
			var newRow = noughtMove[rowToNum[rowString]][1];			
		
			for (var key in rowToNum) {
				
				if (rowToNum[key] === newRow) {
					
					row[0] = key[0];
					row[1] = key[1];
					row[2] = key[2];
					
					break;
				}
			}
		}

		return moveResult;
		
	} // checkRow()

	/**  
	 *
	 * @private
	 */
	 
	// TODO - Where to get the debug flag from, so we could possibly 
	// throw all errors.
	
	// TODO - put logging back in??
	
	function log(functionName, message, errorCode) {
		
		if (errorCode) {
			
			self.error = errorCode + ' : ' + message;
			errorCode = " ERROR: " + errorCode;
		
		} else {
		
			errorCode = '';
		}
		
		console.log(functionName + ': ' + message + errorCode);
	} 

	function userError(error, msg) {
		
		// assert(error isPropertyof this.STATE, 'userError() - Invalid error');
		
		old_state = self.state;
		self.state = self.STATE.ERROR;
		self.error = error;
	}
	
	function progError(error, msg) {
		
		// assert(error isPropertyof this.STATE, 'userError() - Invalid error');
		
		throw new Error(error + msg);
		
		// TODO - Debug mode.
		
		/*
		old_state = this.state;
		this.state = this.STATE.ERROR;
		this.error = error;
		*/
	}
							
}; // TicTacToe()

module.exports = TicTacToe;
