var CTRLC = '\u0003',
	out = console.log,
	PLAYER = {
		
		EMPTY: '.',
		CROSS:'X',
		NOUGHT: '0'
	},
	NUMBER_CELLS = 9;


// The Board
// ---------

var Board = function() {
	
	// Public
	// ======
	
	// Board.getInstance()
	// -------------------
	
	this.getInstance = function() {
	
		return instance;
	};
	
	// Rotate the board by 90 degrees clockwise. 
	// The values in 'rotate' tell us how to move the old cell
	// to get it in the new position.
	
	// Board.display()
	// ---------------
	
	this.display = function() {
		
		var i = 0;
		
		while (i < 9) {
			
			out(cells[i].player + cells[i+1].player + cells[i+2].player);
			
			i += 3;
		}
		
		out('---');
		
	}; // Board.display()

	// Board.set()
	// -----------
	
	this.set = function (id, player) {
		
		// TODO - Check player
/*	
		if (cells[id - 1].player !== PLAYER.EMPTY) {
			
			out ('Already taken, try again');
			return false;
		}
*/		
		cells[id - 1].player = player;

		return true;
		
	}; // Board.set()

	// Board.getResponse()
	// -------------------

	this.getResponse = function(key) {

		// Simply fill in the first space.
		for (var i = 0; i < 9; i++) {
			
			if (cells[i].player === PLAYER.EMPTY) {
			
				cells[i].player = PLAYER.NOUGHT;
				break;
			}
		}
		
	}; // Board.getResponse()

	// Board.checkForWin()
	// -------------------


	// TODO - Check for win.

	this.checkForWin = function() {

		var i,
			win;
		
		// Rotate the board four times and check each time for a winning 
		// pattern.
		for (i = 0; i < 4; i++) {
			
			// Check for winning patterns: across, diagonal or down.
			if ((cells[0].player === cells[1].player && cells[0].player === cells[2].player) ||
				(cells[0].player === cells[4].player && cells[0].player === cells[8].player) ||
				(cells[0].player === cells[3].player && cells[0].player === cells[6].player))
			{
				out(cells[0].player + ' wins!');
				process.exit();	
			}
			
			rotate90();
		}
		
	}; // Board.checkForWin()	

	// Private
	// -------

	// An array of 'Cell's.
	var cells = [],

	// Return the instance to make this a singleton.
		instance = this,
	
		row,
		col,
		cell;

	// Initialise the cells array.
	for (row = 0; row < 3; row++) {
		
		for (col = 0; col < 3; col++) {
			
			cell = new Cell(col, row, parseInt((row * 3) + col + 1, 10));
//			cell = new Cell(col, row, PLAYER.EMPTY);
			cells.push(cell);				
		}
	}
	
	// Board.Cell()
	// ------------
	
	function Cell(col, row, player) {
/*

// TODO - Check player type.

		var badPlayerType = true;

		for (type in PLAYER) {
			
			if (player === type) {
				
				badPlayerType = false;
			}
		}
		
		if (badPlayerType) {
			
			throw new Error('Board.Cell() - bad player type');
		}		
*/

		this.col = col, 
		this.row = row, 
		this.player = player;
		
	} // Board.Cell()

	// Board.rotate90()
	// ----------------
	
	function rotate90() {

		var rotate = [7, 4, 1, 8, 5, 2, 9, 6, 3],
			oldPosition = [],
			i;

		for (i = 0; i < NUMBER_CELLS; i++) {
			
			oldPosition[i] = cells[i].player;
		}

		for (i = 0; i < NUMBER_CELLS; i++) {
			
			cells[i].player = oldPosition[rotate[i]- 1];
		}
		
	}; // Board.rotate90()
		
}; // Board()

var Board = new Board();

// Input
// -----

var stdin = process.stdin;

// Without this, we would only get streams once enter is pressed.
stdin.setRawMode(true);

// Resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens).
stdin.resume();

stdin.setEncoding('utf8');

// On any data into stdin.
stdin.on('data', function(key) {

	if (!processKeyPress(key)) {
		
		return;
	}
	
	Board.checkForWin(PLAYER.CROSS);
  
	Board.getResponse(key);

	Board.display();

	Board.checkForWin(PLAYER.NOUGHT);
	
	// Private
	// -------
	
	function processKeyPress(key) {
		
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

