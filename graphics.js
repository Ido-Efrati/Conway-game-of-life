//an abstract data type for Graphics

// Graphics object constructor 
// @param{number} MAX_X the number of cells in a row
// @param{number} MAX_Y the number of cells in a column
var Graphics = function(MAX_X,MAX_Y){
	var that = Object.create(Graphics.prototype);
	var xValue =MAX_X;
	var yValue = MAX_Y;

	// drawingInitBoard - given a board configuration, bind each cell to its div.
	// set a click listener to each div to allow the user to toggel cells' status before the game starts
	// @param{array} - a 2D array representation of the board with the cells objects in it
	that.drawingInitBoard = function(board){
		var container = $("#div_container");
		for (var i = 10; i < xValue; i = i + 10) {
			var  rowDiv = $("<div>", {class:"div_row"});
			for (var j = 10; j < yValue; j = j + 10) {
				if (board[i][j].getCellState() === true) {
					var divValue =$("<div>", {class:"cell live_cell"});
					//binds a click listener to live cell's divs. Allows users to change their status from live to dead by toggeling them
					divValue.bind("click", function(){
						var classValue = $(this).hasClass('live_cell');
						if (classValue === true ) {
				 			$(this).removeClass('live_cell');
				 			$(this).addClass('dead_cell');
						}
						if (classValue === false ) {
				 			$(this).removeClass('dead_cell');
				 			$(this).addClass('live_cell');
						}	
					});
					rowDiv.append(divValue);
					//bind a div to a cell
					board[i][j].setCellDiv(divValue);
				}

				else{
					var divValue2 =$("<div>", {class:"cell dead_cell"});
					//binds a click listener to dead cells' divs. Allows users to change their status form dead to live by toggeling them
					divValue2.bind("click", function(){
						var classValue = $(this).hasClass('dead_cell');
						if (classValue === true) {
							$(this).removeClass('dead_cell');
				 			$(this).addClass('live_cell');
						}
						if (classValue === false) {
							$(this).removeClass('live_cell');
							$(this).addClass('dead_cell');
						}
					});
					rowDiv.append(divValue2);
					//bind a div to a cell
					board[i][j].setCellDiv(divValue2);
				};
			}
			container.append(rowDiv);
		}
	};

	// paintNextStep - given a board iterate over the board and check the binded div of each cell.
	// the method will update the class of the cell (live_cell or dead_cell) based on the cell status.
	// @param{array} - a 2D array representation of the board with the cells objects in it
	that.paintNextStep = function(board){
		for (var i = 10; i < xValue; i = i + 10) {
			for (var j = 10; j < yValue; j = j + 10) {
				var shouldStayAlive = board[i][j].getCellState();
				if (shouldStayAlive === false) {
					$(board[i][j].getCellDiv()).removeClass('live_cell');
				 	$(board[i][j].getCellDiv()).addClass('dead_cell');
				}
				if (shouldStayAlive === true) {
					$(board[i][j].getCellDiv()).removeClass('dead_cell');
				 	$(board[i][j].getCellDiv()).addClass('live_cell');
				}
			}
		 }
	};

return that};

