proj1
=====

Project 1 - phase 2

*To start the game of life open the DOM game of life.html file.
	* the game starts with a randomly generated 20x20 board
	* cells colors: orange - dead cells blue - live cells

*board.js contains an abstract data type of the board with methods to auggment the board for example:
	 step to the next generation,calculation of the surrounding living cells, and applying rules.

*cell.js contains an abstract data type of the cell with methods to auggment the cell for example :
	change current status from dead to alive	

*graphics.js - contains an abstract data type of the graphics with methods to paint the board using the dom.

*game_of_life.js - contains listeners for DOM elements. The game is activated through this file


*To run the tests for conway's game of life open the file tests_game_of_life.html.
	* testing strategy can be found in the tests.js file 


Project requirments

	*You should build a web page that allows a user to start and stop an instance of the Game of Life.
		To start an instance of the Game of Life the user should click on the New Game button. Once this button is clicked the user can
		stop the game by clicking on the pause button, and start it again by clicking on the Resume button.

	*allows a user to select initial conditions.
		The user can change the size of the board by using the slider. The board size goes from 2x2 to 25x25. 
		Each movment of slide creates a new board with the required size.
		In addition, the user can edit the randomly generated board by clicking on the cells and changing their status from dead to alive and vice versa.
		Once the game starts the user cannot change the board.
		
	*you should also include one additional feature of your own invention
		manually step back and forward. Once the user starts a new game, he or she can pause the automatic advnace (by clicking on the pause button) of the game and manually step forward and backwoard by clicking Step for forward or Reverse for backward.
		Histroy is saved even if the game was in automatic advnace. Thus the user can reverse backward even if he or she did not manually advance.
