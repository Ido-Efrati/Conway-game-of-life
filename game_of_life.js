// Game Of Life - Lisetners. 
// Ido Efrati

$(function () {    
	var MAX_X = 200; //initial row size value 
	var MAX_Y = 200; //initial column size value
  	var timeToStep = 1000;
  	var boardTest = Board(MAX_X,MAX_Y);
  	var graphicTool = Graphics(MAX_X,MAX_Y);
  	var stepping;
  	var newButton = $("#buttonNewGame");
  	var resumeButton = $("#buttonResumePause");
  	var stepButton = $("#buttonStep");
  	var reverseButton = $("#buttonReverse");

  	//randomly generate an initial board that the user can change 
	var board = boardTest.initBoard().getBoard();
	graphicTool.drawingInitBoard(board);


	/*
	*
	* Helper functions 
	*
	*/

	//updateValuesAfterClick - the methods update cells' status after the user changed the board by clicking on cells
	var updateValuesAfterClick = function(){
		var listOfCells = $('.cell');
		for (var i = 0 ; i < listOfCells.size() ; i++ ) {
			var isCellLive = $(listOfCells[i]).hasClass('live_cell');
			//finds cell in the board.
			x_coord = i%(MAX_Y/10 - 1);
			y_coord = Math.ceil((i-x_coord)/(MAX_X/10 - 1));
			//scale coordinates to fit the array coordinates
			fix_xcoord = (x_coord + 1) * 10;
			fix_ycoord = (y_coord + 1) * 10;
			boardTest.getBoard()[fix_ycoord][fix_xcoord].setCurrentState(isCellLive);

		}
	};

	//unbindClicks - unbind the click listners from divs. This will prevent users from changing the board once the game started.
	var unbindClicks = function(){
		var listOfCells = $('.cell');
		for ( var i = 0 ; i < listOfCells.size(); i++) {
			$( listOfCells[i]).unbind( "click" );
		}
	}

	/*
	*
	* Listeners 
	*
	*/

	//slider listener - allows the user to scale the board from a 2x2 to a 25x25 board.
	//when a user scales the board a new board with the correct size will be generated.
	//Once a new game starts the user will not be able to change the size of the board.
	$('#slider').change(function(){
		var val = $('#slider').val();
		$(".range").text(val);
		MAX_Y = val*10 +10;
		MAX_X = val*10 +10;
		//clean the previous board from the screen
		$("#div_container").empty();
		//generate the new board
		boardTest = Board(MAX_X,MAX_Y);	
		graphicTool = Graphics(MAX_X,MAX_Y);
		board = boardTest.initBoard().getBoard();
		graphicTool.drawingInitBoard(board);
	});

	//New game button listener - allows the user to start a new game.
	//Once clicked the new button will disable the slider, and will unbind the click listeners on the divs.
	//The new button will be disabled and the Pause/Resume button will be enabled.
	//The game will advance automatically while the Pause button was not pressed.
	$(newButton).click(function(){
		updateValuesAfterClick();
		unbindClicks();
		$("#slider").attr("disabled", true);
		$("#buttonResumePause").removeAttr('disabled');
		$("#buttonNewGame").attr("disabled", true);
		$("#rowCellsValue").attr("disabled", true);
		$( '#colCellsValue' ).attr("disabled", true);
		stepping  = setInterval(function(){
  				board = boardTest.step().getBoard();
  				graphicTool.paintNextStep(board)}, timeToStep);
		});

	//Pause/Resume listener - allows the user to pause the game and resume to automatically advance option.
	//When the game is paused the step and reverse buttons are enabled, and when it resumed the step and reverse buttons are disabled.
	$(resumeButton).click(function() {
		var buttonText = resumeButton.text();
		if(buttonText == "Resume"){
			resumeButton.html("Pause");
			$("#buttonStep").attr("disabled", true);
			$("#buttonReverse").attr("disabled", true);
			//game was resumed advance automatically 
			stepping  = setInterval(function(){
  				board = boardTest.step().getBoard();
  				graphicTool.paintNextStep(board)}, timeToStep);
		}
		else{
			resumeButton.html("Resume");
			clearInterval(stepping);
			$("#buttonStep").removeAttr('disabled');
			$("#buttonReverse").removeAttr('disabled');

		};	
	});

	//Step button listener - allows the user to manually step forward while the game is in pause mood.
	$(stepButton).click(function() {
		board = boardTest.step().getBoard();
		graphicTool.paintNextStep(board);
	});

	// Reverse button listener - allows the user to step backward while the game is in pause mood.
	// if the game has no more steps to reverse to, nothing won't happen.
	// Note: If the board reaches equilibrium and setInterval is still active the same board will be entered to the oldStates array at the end of
	// an interval. Thus, a user may not see a reverse action immediately even though he or she actually stepping backward
	$(reverseButton).click(function() {
		board = boardTest.stepBack().getBoard();
		graphicTool.paintNextStep(board);
	});

}) ;


