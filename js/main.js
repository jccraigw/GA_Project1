console.log("hi");

//grabing 2d canvas to work on
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//number of block rows on right side
var blockRowCount = 2;
//number of block columns on right side
var blockColumnCount = 4;
//width of each block
var blockWidth = 50;
//height of each block
var blockHeight = 50;


//create right side blocks 
//hold them in an array to store for collison detection
var blocksRight = [];
//loop through blocks and create 2 array of containing the x and y position of the blocks
for(c=0; c<blockColumnCount; c++){
	blocksRight[c] = [];
	for(r=0; r < blockRowCount; r++){

		blocksRight[c][r] = {x: 0, y: 0};
		console.log(blocksRight[c][r].x, ",", blocksRight[c][r].y);
		
	}

}

//create left side blocks 
//hold them in an array to store for collison detection
var blocksLeft =[];
//loop through blocks and create 2 array of containing the x and y position of the blocks
for(c=0; c<blockColumnCount; c++){
	blocksLeft[c] = [];
	for(r=0; r < blockRowCount; r++){

		blocksLeft[c][r] = {x: 0, y: 0};
		console.log(blocksLeft[c][r].x, ",", blocksLeft[c][r].y);
		
	}

}


