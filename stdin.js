
var out = console.log;
var TicTacToe = require('./lib/tictactoe');

(function () {

	var stdin = process.stdin;

	// Without this, we would only get streams once enter is pressed.
	stdin.setRawMode(true);

	// Resume stdin in the parent process (node app won't quit all by itself
	// unless an error or process.exit() happens).
	stdin.resume();

	// Rather than binary input.
	stdin.setEncoding('utf8');

	var ttt = new TicTacToe();

	resetBoard();

	// On any data into stdin.
	stdin.on('data', function(key) {

		var CTRLC = '\u0003';
		
		// out('key: ' + key);
		
		// ctrl-c ( end of text )
		if (key === CTRLC) {
			
			process.exit();
		}

		ttt.xPlay(parseInt(key, 10));
		
		processNewState();
		
		return;
		
		// Private
		// -------
		
		function processNewState() {
		
			switch (ttt.state) {
			
				case ttt.STATE.WAITING_X:
				
					displayBoard();
					break;
					
				case ttt.STATE.X_WON:
					
					out('\nX won!');
					displayBoard();		
					resetBoard();
					break;
				
				case ttt.STATE.O_WON:
					
					out('\nO won!');
					displayBoard();				
					resetBoard();
					break;

				case ttt.STATE.DRAW:
					
					out('\nDraw!');
					displayBoard();				
					resetBoard();
					break;
				
				case ttt.STATE.ERROR: 
				
					processError();
					break;
				
				default:
					
					throw new Error('Invalid TicTacToe state');
			}
		
		} // processNewState()

		function processError() {
	
			switch (ttt.error) {
			
				case ttt.ERROR.SQUARE_TAKEN:
				
					out('That square is taken try another one');
					break;
					
				case ttt.ERROR.BAD_TYPE:
				
					out('Needs to be a number');
					break;
					
				case ttt.ERROR.OUT_OF_RANGE:
					
					out('Number needs to be between 1 and 9');
					break;
					
				default:
				
					throw new Error('Unexpected error in TicTacToe()' + ttt.error);
			}
			
			ttt.clearError();
			
		} // processError()

	});

	function resetBoard() {

		ttt.init();
		out('\nNew Game: Pick a number from 1 to 9 (CTRL-C to quit):');
		displayBoard();
		
	} // resetBoard()

	function displayBoard() {

		var i;
		var board = ttt.board;

		out(' ');
		
		for (i = 0; i < board.length; i += 3) {
			
			out(' ' + board[i] + board[i+1] + board[i+2]);
		}
		
	} // displayBoard()
		
})(); 
		


