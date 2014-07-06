
var out = console.log;

// The Board
// ---------

var	PLAYER = {
		
		EMPTY: '.',
		CROSS: 'X',
		NOUGHT: '0'
	};

var Board = new BoardClass();

function BoardClass() {
	
	// Public
	// ======
	
	// Board.getInstance()
	// -------------------
	
	this.getInstance = function() {
	
		return instance;
	};
	
	// Board.init()
	// ------------
	
	this.init = function() {
		
		var i,
			cell;
		
		// Initialise the board array.
		for (i = 0, board.length = 0; i < NUMBER_CELLS; i++) {
			
			// cell = parseInt(i + 1, 10);
			cell = PLAYER.EMPTY;
			board.push(cell);
		}
		
	}; // Board.init()	

	// Board.display()
	// ---------------
	
	this.display = function() {
		
		var i;

		out(' ');
		
		for (i = 0; i < board.length; i += 3) {
			
			out(' ' + board[i] + board[i+1] + board[i+2]);
		}
		
	}; // Board.display()

	// Board.set()
	// -----------
	
	this.set = function (id, player) {

		if (parseInt(id, 10) < 1 || parseInt(id, 10) > 9) {
			
			out('Number has to be between 1 and 9');
			return false;
		}

		// Make it an index.
		var i = id - 1;

		if (board[i] === PLAYER.CROSS || board[i] === PLAYER.NOUGHT) {
	
			out('That move has already been taken');
			return false;
		}

		board[i] = player;
		return true;
		
	}; // Board.set()

	// Board.getComputerResponse()
	// ---------------------------

	this.getComputerResponse = function(key) {

		var i,
			madeMove = false;

		// Look for a winning move
		// -----------------------

		// TODO - make into a function table.

		// Check for '0 0 .' on top line, e.g. 1 and 2.
		for (i = 0; i < 4; i++) {

			if (board[0] === PLAYER.NOUGHT && 
			    board[1] === PLAYER.NOUGHT && 
			    board[2] !== PLAYER.CROSS && 
			    !madeMove) {
				
				board[2] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Check for '. 0 0' on top line, e.g. 2 and 3.
		for (i = 0; i < 4; i++) {

			if (board[0] !== PLAYER.CROSS && 
			    board[1] === PLAYER.NOUGHT && 
			    board[2] === PLAYER.NOUGHT && 
			    !madeMove) {
				
				board[0] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Check for '0 0 .' through the middle from the middle, e.g. 3 and 5.
		for (i = 0; i < 4; i++) {

			if (board[1] === PLAYER.NOUGHT && 
				board[4] === PLAYER.NOUGHT && 
				board[7] !== PLAYER.CROSS &&
				!madeMove) {
				
				board[7] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}
		
		if (madeMove) {
			
			return;
		}

		// Check for '0 0 .' through the middle from the corner, e.g. 1 and 5.
		for (i = 0; i < 4; i++) {

			if (board[0] === PLAYER.NOUGHT && 
				board[4] === PLAYER.NOUGHT && 
				board[8] !== PLAYER.CROSS &&
				!madeMove) {
				
				board[8] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Check for '0 . 0' on the edges, e.g. 1 and 3.
		for (i = 0; i < 4; i++) {

			if (board[0] === PLAYER.NOUGHT && 
				board[2] === PLAYER.NOUGHT && 
				board[1] !== PLAYER.CROSS &&
				!madeMove) {
				
				board[1] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Check for '0 . 0' through the middle, e.g. 1 and 9.
		for (i = 0; i < 4; i++) {

			if (board[0] === PLAYER.NOUGHT && 
				board[4] !== PLAYER.CROSS &&
				board[8] === PLAYER.NOUGHT && 
				!madeMove) {
				
				board[4] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Look for a defensive, blocking move
		// -----------------------------------

		//TODO - Put this into data table.

		// Check for 'X X .' on top line, e.g. 1 and 2.
		for (i = 0; i < 4; i++) {

			if (board[0] === PLAYER.CROSS && 
			    board[1] === PLAYER.CROSS && 
			    board[2] !== PLAYER.NOUGHT && 
			    !madeMove) {
				
				board[2] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Check for '. X X' on top line, e.g. 2 and 3.
		for (i = 0; i < 4; i++) {

			if (board[0] !== PLAYER.NOUGHT && 
			    board[1] === PLAYER.CROSS && 
			    board[2] === PLAYER.CROSS && 
			    !madeMove) {
				
				board[0] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Check for 'X X .' through the middle from the middle, e.g. 3 and 5.
		for (i = 0; i < 4; i++) {

			if (board[1] === PLAYER.CROSS && 
				board[4] === PLAYER.CROSS && 
				board[7] !== PLAYER.NOUGHT &&
				!madeMove) {
				
				board[7] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}
		
		if (madeMove) {
			
			return;
		}

		// Check for 'X X .' through the middle from the corner, e.g. 1 and 5.
		for (i = 0; i < 4; i++) {

			if (board[0] === PLAYER.CROSS && 
				board[4] === PLAYER.CROSS && 
				board[8] !== PLAYER.NOUGHT &&
				!madeMove) {
				
				board[8] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Check for 'X . X' on the edges, e.g. 1 and 3.
		for (i = 0; i < 4; i++) {

			if (board[0] === PLAYER.CROSS && 
				board[2] === PLAYER.CROSS && 
				board[1] !== PLAYER.NOUGHT &&
				!madeMove) {
				
				board[1] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Check for 'X . X' through the middle, e.g. 1 and 9.
		for (i = 0; i < 4; i++) {

			if (board[0] === PLAYER.CROSS && 
				board[4] !== PLAYER.NOUGHT &&
				board[8] === PLAYER.CROSS && 
				!madeMove) {
				
				board[4] = PLAYER.NOUGHT;
				madeMove = true;
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		if (madeMove) {
			
			return;
		}

		// Put it in the middle if that's not taken.
		if (!cellUsed(4)) {

			board[4] = PLAYER.NOUGHT;
			madeMove = true;
		}
		
		if (madeMove) {
			
			return;
		}

		// TODO - Make this random.

		// Simply fill in the first free space.
		for (i = 0; i < NUMBER_CELLS; i++) {
			
			if (!cellUsed(i)) {
			
				board[i] = PLAYER.NOUGHT;
				madeMove = true;
				break;
			}
		}

	}; // Board.getComputerResponse()

	// Board.checkForWin()
	// -------------------

	this.checkForWin = function() {

		var i,
			draw = true,
			won = false;
				
		// Check for winning patterns across, by shifting the board in the board down 
		// three times and see if the winning pattern comes into the first row.
		for (i = 0; i < 3; i++) {

			if (cellUsed(0) && board[0] === board[1] && board[0] === board[2]) {
			
				win();
				won = true;
			}
			
			transform(TRANSFORM.SHIFT_DOWN);
		}
		
		// Check for winning pattern down, by shifting the cells in the board right 
		// three times and see if the winning pattern comes into the first column.
		for (i = 0; i < 3 && !won; i++) {

			if (cellUsed(0) && board[0] === board[3] && board[0] === board[6]) {
				
				win();
				won = true;				
			}
			
			transform(TRANSFORM.SHIFT_RIGHT);			
		}		
		
		// Check for winning pattern diagonally by rotating the cells 90 degrees CW 
		// three times and see if the winning pattern comes into the first column.
		// The last ones aren't actually necessary, they just put things back as they were.
		for (i = 0; i < 4 && !won; i++) {

			if (cellUsed(0) && board[0] === board[4] && board[0] === board[8]) {
				
				win();
				won = true;				
			}
			
			transform(TRANSFORM.ROTATE_90_CW);
		}

		// If a win hasn't already been found check if the board is now full.
		
		for (i = 0; i < board.length && !won; i++) {
			
			if (!cellUsed(i)) {
				
				draw = false;
				break;
			}
		}

		if (draw && !won) {
			
			out('\nDraw - resetting board');
			instance.init();
		}

		return won || draw;

		// Board.checkForWin.win()
		// -----------------------

		function win() {
			
			if (won) {
				
				throw new Error('Board.checkForWin.win() - already won');
			}
			
			out(board[0] + ' wins!\n');
			out('Pick a number from 1 to 9:');
			instance.init();
			
		} // Board.checkForWin.win()
		
	}; // Board.checkForWin()	

	// Private
	// =======

	// The board - an array of chars.
	var board = [],

	// Return the instance to make this a singleton.
		instance = this,
		
		NUMBER_CELLS = 9;

	// Board.transform()
	// ----------------
	//
	// Store the old player positions then apply the transformation
	// to the board; move the cells to their new positions.
	
	// type parameter enum.
	var TRANSFORM = {
		
		ROTATE_90_CW: 0,
		ROTATE_90_CCW: 1,		
		SHIFT_RIGHT: 2,
		SHIFT_LEFT: 3,
		SHIFT_UP: 4,
		SHIFT_DOWN: 5
	};

	function transform(type) {

		var newPosition = [[3, 6, 9, 2, 5, 8, 1, 4, 7],  // Rotate 90 CW
						   [7, 4, 1, 8, 5, 2, 9, 6, 3],  // Rotate 90 CCW
						   [2, 3, 1, 5, 6, 4, 8, 9, 7],  // Shift 1 right
						   [3, 1, 2, 6, 4, 5, 9, 7, 8],  // Shift 1 left
						   [7, 8, 9, 1, 2, 3, 4, 5, 6],  // Shift 1 up
						   [4, 5, 6, 7, 8, 9, 1, 2, 3]], // Shift 1 Down						 
			oldPosition = [],
			i;

		for (i = 0; i < board.length; i++) {
			
			oldPosition[i] = board[i];
		}

		for (i = 0; i < board.length; i++) {
			
			board[i] = oldPosition[newPosition[type][i]- 1];
		}
		
		// instance.display();
		
	} // Board.transform()
	
	// Board.cellUsed()
	// ----------------
	
	function cellUsed(i) {
		
		if (i < 0 || i >= NUMBER_CELLS) {
			
			throw new Error('Board.cellUsed() - illegal index');
		}
		
		return (board[i] === PLAYER.CROSS || board[i] === PLAYER.NOUGHT);
		
	} // Board.cellUsed()
							
} // Board()

// Input
// -----

var stdin = process.stdin;

// Without this, we would only get streams once enter is pressed.
stdin.setRawMode(true);

// Resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens).
stdin.resume();

stdin.setEncoding('utf8');

Board.init();

out('Pick a number from 1 to 9 (CTRL-C to quit):');

// On any data into stdin.
stdin.on('data', function(key) {

	if (!processKeyPress(key)) {
		
		return;
	}
	
	Board.display();
	
	if (Board.checkForWin(PLAYER.CROSS))
	{
		return;
	}
  
	Board.getComputerResponse(key);

	Board.display();

	Board.checkForWin(PLAYER.NOUGHT);
	
	return;
	
	// Private
	// -------
	
	function processKeyPress(key) {
		
		var CTRLC = '\u0003';
		
		out('key: ' + key);
		
		// ctrl-c ( end of text )
		if (key === CTRLC) {
			
			process.exit();
		}
		  
		key = parseInt(key, 10);

		if (typeof key === 'NaN') {
			
			out ('Has to be 1 - 9');		
			return false;
		}

		return(Board.set(key, PLAYER.CROSS));
	}
});

