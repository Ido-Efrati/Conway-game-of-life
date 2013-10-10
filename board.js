// An abstract data type for the board.

// Board object constructor 
// @param{number} MAX_X the row length of the board.
// @param{number} MAX_Y the column lenght of the board.
var Board = function(MAX_X,MAX_Y){
	var that = Object.create(Board.prototype);
	var xValue = MAX_X;
	var yValue = MAX_Y;
	var board = new Array(MAX_X);

	//initBoard generates a board with different starting conditions for the Game of Life. 
	//The method randomly set cells to be dead (false) or alive (true).

	that.initBoard = function(){
		for (var i = 10; i < xValue; i = i + 10) {
			board[i] =  new Array(yValue);
			for (var j = 10; j < yValue; j = j + 10) {
				var setCellStatus = Math.random() <= 0.5;
				board[i][j] = Cell(setCellStatus);
			}
		}
	return that;
	};

	// a getter method to get the board.
	that.getBoard = function(){
		return board};

	//numberOfCells 
	//@param{number} rowValue the x coordinate of the cell
	//@param{number} colValue the y coordinate of the cell
	//The method calculates the number of live neighbors surrounding a given cell (not including the evaluated cell).
	//The method gets a coordinate for a cell (rowValue, colValue).
	//Edge cells do not wrap around. Meaning they will have less than 8 neighbors (e.g. the top left cell only has 3 neighbors)
	that.numberOfCells = function(rowValue , colValue){
 		var liveCells = 0;
		for (var i = rowValue -10 ; i<= rowValue + 10 ;i = i+ 10){
			for (var j = colValue -10 ; j <= colValue + 10 ; j = j+ 10 ){
				if((i > 0 && i < xValue) && (j > 0 && j < yValue)){
				if( board[i][j].getCellState() === true){
					liveCells += 1;
				}
			}
		}
	}
	//The evaluated cell should not count as its own neighbor.
	if(board[rowValue][colValue].getCellState() === true){
		liveCells -= 1;
	}
	board[rowValue][colValue].setLiveNeighbors(liveCells);
	}

	//rules
	//@param{number} rowValue the x coordinate of the cell
	//@param{number} colValue the y coordinate of the cell
	//The Rules method evaluates every cell and if necessary changes it status for the next generation
	//The cell status is being checked at the cell level and the next generation status is stored at the cell.
	//This way rules will be applied simultaneously 
	//The rules (http://en.wikipedia.org/wiki/Conway's_Game_of_Life) :
	//1) Any live cell with fewer than two live neighbours dies.
	//2) Any live cell with two or three live neighbours lives on to the next generation.
	//3) Any live cell with more than three live neighbours dies.
	//4) Any dead cell with exactly three live neighbours becomes a live cell.
	that.rules = function(rowValue , colValue){
		var cell = board[rowValue][colValue];
		var liveAroundCell = cell.getCellNeighbors();
		var cellState = cell.getCellState();
 		if (liveAroundCell < 2 && cellState === true) {
 			cell.setCellToDead();
 		}
 		else if ((liveAroundCell === 2 || liveAroundCell === 3) && cellState === true){
 			cell.setCellToAlive();
 		}
 		else if ( liveAroundCell > 3 && cellState === true){
 			cell.setCellToDead();
 		}
 		else if ( liveAroundCell ===3 && cellState === false){
 			cell.setCellToAlive();
 		}
 		else{
 			cell.setCellToDead();
 		}
	};

	//updateBoard- the methods iterate over the board and update each cell's status for the next generation
	that.updateBoard = function(){
		for (var i = 10; i < xValue; i = i + 10) {
			for (var j = 10; j < yValue; j = j + 10) {
				board[i][j].updateCellState();
			}
		}
	return that;
	};

	//step - the method advances the board to the next genration. by checking the living neighbors of each cells and applting the rules on each cells.
	// rules are being applied simultaneously on every cell
	that.step = function(){
 	 for (var i = 10; i < MAX_X; i = i + 10) {
		for (var j = 10; j < MAX_Y; j = j + 10) {
			that.numberOfCells(i,j);
			that.rules(i, j);
		}
	 }
	return that.updateBoard();
	};
	//stepBack - the method iterate over every cell and set it status to the previous status.
	that.stepBack = function(){
 	 for (var i = 10; i < MAX_X; i = i + 10) {
		for (var j = 10; j < MAX_Y; j = j + 10) {
			board[i][j].goToOldState();
		}
	}
	return that;
	};

return that};



