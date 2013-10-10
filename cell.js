// An abstract data type for the cell.

// Cell object constructor 
// @param{boolean} cellStatus the initial status of the cell.
var Cell = function(cellStatus){
var that = Object.create(Cell.prototype);
var currentState = cellStatus;
var nextState = undefined;
var liveNeighbors = 0;
var cellDiv = undefined;
var oldStates = [];

	//setCellToAlive - set the next generation status (nextState) to alive (true)
	that.setCellToAlive = function(){
		nextState = true;
	}
	
	//setsCurrentState 
	//@param{boolean} clickState - the cell state as toggled by the user.
	//The method allows the user to click on a cell before a new game starts and change it status.
	that.setCurrentState = function(clickState){
		currentState = clickState;
	}
	
	//setCellToDead - set the next generation status (nextState) to dead (false)
	that.setCellToDead = function(){
		nextState = false;
	}

	//updateCellState - keeps the old state of the cell in the oldStates array for reverse functionality,
	// and update the cell's status for the next generation
	that.updateCellState = function(){
		oldStates.push(currentState);
		currentState = nextState;
	}

	that.getArray = function(){
		return oldStates;
	};

	//goToOldState - reverse the status of the board to the previous generation.
	that.goToOldState = function(){
		if(oldStates.length >0){
			currentState= oldStates.pop();
			nextState = currentState;
		};
	};

	//getCellState - returns the current state of the cell
	that.getCellState = function(){
		return currentState;
	}

	//getCellNextState - for testing
	that.getNextState = function(){
		return nextState;
	}
	
	//setCellDiv -  the method bind the div representation of the cell in the DOM to the cell object. 
	//@param{Jquery div code}
	that.setCellDiv = function(divForCell){
		cellDiv = divForCell;
	}

	//getCelDiv - returns the div representation of the cell.
	that.getCellDiv = function(){
		return cellDiv;
	}

	//setLiveNeighbors - set the number of live neighbors of a given cell
	//@param{number} - the number of live neighbors
	that.setLiveNeighbors = function(neighbors){
		liveNeighbors = neighbors;
	}

	//getCellNeighbors - returns the number of live neighbors
	that.getCellNeighbors = function(){
		return liveNeighbors;
	}

return that};

