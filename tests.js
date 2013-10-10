/*
testing strategy for numberOfCells
*  living neighbors - given a 2X2 board with 4 living cells verify that each cell has 3 living neighbors
*  no neighbors - given a 2X2 board with 4 dead cells verify that each cell has 0 living neighbors
*  two dead cell - given a board with 2 dead cells and 2 living cells verify that the dead cells have 2 neighbors and the living ones have 1 neighbor.
*/
test("living neighbors", function() {
	//Create a 2x2 board with 4 living cells
	var MAX_X = 30;
	var MAX_Y =30
	var boardTest = Board(MAX_X,MAX_Y);
	var board =boardTest.getBoard();
	for (var i = 10; i < MAX_X; i = i + 10) {
		board[i] =  new Array(MAX_Y);
		for (var j = 10; j < MAX_Y; j = j + 10) {
			var setCellStatus = true;
			board[i][j] = Cell(setCellStatus); // a 2 by 2 board with 4 living cells
			}
		}
	//calculate the cell's neighbors
	boardTest.numberOfCells(10,10);
	boardTest.numberOfCells(10,20);
	boardTest.numberOfCells(20,10);
	boardTest.numberOfCells(20,20);

	equal(board[10][10].getCellNeighbors(), 3, "3 living cells for [10][10]" );
	equal(board[10][20].getCellNeighbors(), 3, "3 living cells for [10][20]" );
	equal(board[20][10].getCellNeighbors(), 3, "3 living cells for [20][10]" );
	equal(board[20][20].getCellNeighbors(), 3, "3 living cells for [20][20]" );
	});

test("no neighbors", function() {
	//create a 2x2 board with 4 dead cells
	var MAX_X = 30;
	var MAX_Y =30
	var boardTest = Board(MAX_X,MAX_Y);
	var board =boardTest.getBoard();
	for (var i = 10; i < MAX_X; i = i + 10) {
		board[i] =  new Array(MAX_Y);
		for (var j = 10; j < MAX_Y; j = j + 10) {
			var setCellStatus = false;
			board[i][j] = Cell(setCellStatus); // a 2 by 2 board with 4 living cells
			}
	}
	//calculate the cell's neighbors
	boardTest.numberOfCells(10,10);
	boardTest.numberOfCells(10,20);
	boardTest.numberOfCells(20,10);
	boardTest.numberOfCells(20,20);

	equal(board[10][10].getCellNeighbors(), 0, "0 living cells for [10][10]" );
	equal(board[10][20].getCellNeighbors(), 0, "0 living cells for [10][20]" );
	equal(board[20][10].getCellNeighbors(), 0, "0 living cells for [20][10]" );
	equal(board[20][20].getCellNeighbors(), 0, "0 living cells for [20][20]" );
	});

test("two dead cell", function() {
	//create a 2x2 board with 2 dead cells
	var MAX_X = 30;
	var MAX_Y =30
	var boardTest = Board(MAX_X,MAX_Y);
	var board =boardTest.getBoard();
	for (var i = 10; i < MAX_X; i = i + 10) {
		board[i] =  new Array(MAX_Y);
		for (var j = 10; j < MAX_Y; j = j + 10) {
		board[i][j] = Cell(true); // a 2 by 2 board with 2 living cells
			}
	}
	
	board[10][10].setCurrentState(false);
	board[10][20].setCurrentState(false);

	//calculate the cell's neighbors
	boardTest.numberOfCells(10,10);
	boardTest.numberOfCells(10,20);
	boardTest.numberOfCells(20,10);
	boardTest.numberOfCells(20,20);

	equal(board[10][10].getCellNeighbors(), 2, "2 living cells for dead cell [10][10]" );
	equal(board[10][20].getCellNeighbors(), 2, "2 living cells for dead cell [10][20]" );
	equal(board[20][10].getCellNeighbors(), 1, "1 living cells for living cell [20][10]" );
	equal(board[20][20].getCellNeighbors(), 1, "1 living cells for living cell [20][20]" );

});

/*
testing strategy for Ruels
*  Rules on 4 living cells - given a 2X2 board with 4 living cells verify that all cells are alive.
*  Rules on 4 dead cells - given a 2X2 board with 4 dead cells verify that each cell has 0 living neighbors
*  Rules on 2 living cells - given a board with 2 dead cells and 2 living check that all cells die.
*/


test("Rules on 4 living cells", function() {
	// create 4 living cells
	var MAX_X = 30;
	var MAX_Y =30
	var boardTest = Board(MAX_X,MAX_Y);
	var board =boardTest.getBoard();
	for (var i = 10; i < MAX_X; i = i + 10) {
		board[i] =  new Array(MAX_Y);
		for (var j = 10; j < MAX_Y; j = j + 10) {
				board[i][j] = Cell(true);
		} 
	}

	boardTest.numberOfCells(10,10);
	boardTest.rules(10,10);
	boardTest.numberOfCells(10,20);
	boardTest.rules(10,20);
	boardTest.numberOfCells(20,10);
	boardTest.rules(20,10);
	boardTest.numberOfCells(20,20);
	boardTest.rules(20,20);

	equal(board[10][10].getNextState(),true,"cell at [10][10] is alive");
	equal(board[10][20].getNextState(),true,"cell at [10][20] is alive");
	equal(board[20][10].getNextState(),true,"cell at [20][10] is alive");
	equal(board[20][20].getNextState(),true,"cell at [20][20] is alive");
});


test("Rules on 4 dead cells", function() {
	// create 2 living cells and 2 dead cells
	var MAX_X = 30;
	var MAX_Y =30
	var boardTest = Board(MAX_X,MAX_Y);
	var board =boardTest.getBoard();
	for (var i = 10; i < MAX_X; i = i + 10) {
		board[i] =  new Array(MAX_Y);
		for (var j = 10; j < MAX_Y; j = j + 10) {
				board[i][j] = Cell(false);
			
		}
	}
	// check rules (all should die)
	boardTest.numberOfCells(10,10);
	boardTest.rules(10,10);
	boardTest.numberOfCells(10,20);
	boardTest.rules(10,20);
	boardTest.numberOfCells(20,10);
	boardTest.rules(20,10);
	boardTest.numberOfCells(20,20);
	boardTest.rules(20,20);

	equal(board[10][10].getNextState(),false,"cell at [10][10] is dead");
	equal(board[10][20].getNextState(),false,"cell at [10][20] is dead");
	equal(board[20][10].getNextState(),false,"cell at [20][10] is dead");
	equal(board[20][20].getNextState(),false,"cell at [20][20] is dead");
});


test("Rules on 2 living cells", function() {
	// create 2 living cells and 2 dead cells
	var MAX_X = 30;
	var MAX_Y =30
	var boardTest = Board(MAX_X,MAX_Y);
	var board =boardTest.getBoard();
	for (var i = 10; i < MAX_X; i = i + 10) {
		board[i] =  new Array(MAX_Y);
		for (var j = 10; j < MAX_Y; j = j + 10) {
			if (i === 10) {
				board[i][j] = Cell(false);
			}
			else{
				board[i][j] = Cell(true);
			} 
		}
	}
	// check rules (all should die)
	boardTest.numberOfCells(10,10);
	boardTest.rules(10,10);
	boardTest.numberOfCells(10,20);
	boardTest.rules(10,20);
	boardTest.numberOfCells(20,10);
	boardTest.rules(20,10);
	boardTest.numberOfCells(20,20);
	boardTest.rules(20,20);


	equal(board[10][10].getNextState(),false,"cell at [10][10] is dead");
	equal(board[10][20].getNextState(),false,"cell at [10][20] is dead");
	equal(board[20][10].getNextState(),false,"cell at [20][10] is dead");
	equal(board[20][20].getNextState(),false,"cell at [20][20] is dead");
	});


