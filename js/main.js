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
//offset variables for drawing right blocks at desired position
var blockOffsetTopLeft = 300;
var blockOffsetLeft = 50;
//offset variable for drawing left blocks at desired position
var blockOffsetTopRight = 300;
var blockOffsetRight = 50;
//hero drop velocity 
var dy = 2;
//variable to hold the heros radius to be used in collision detection
var heroRadius = 10;


//HERO
//
//create the hero object that will move around the board
//it will need a body to hold direction
//it will need a starting point
//if will need to be draw and have a direction to move
var hero = {
	//body will contain the coordinates for the hero
	body:{},
	//the direcctioin the hero is traveling
	direction: "",
	//create the staring point for the hero
	initHero: function(){

		this.body = {x: 50, y:350, r: 10, e: 0};
	},
	//draw the hero on the canvas
	drawBody: function(){


		ctx.beginPath();
    	ctx.arc(hero.body.x, hero.body.y, heroRadius, 0, Math.PI*2);
    	ctx.fillStyle = "black";
    	ctx.fill();
    	ctx.closePath();

	},
	//move is based off left and right movements only
	//the hero should be constantly falling like gravity
	move: function(){

		if(hero.direction === 'right'){
			//move the heros x position 10 to the right
			hero.body = {x: hero.body.x + 10, y: hero.body.y, r: 10, e: 0}
			//move the hero x position 10 to the left
		}else if(hero.direction === "left"){

			hero.body = {x: hero.body.x + 10, y: hero.body.y, r: 10, e: 0}
		}
	}
}


//BLOCKS
//
//create right side blocks 
//hold them in an array to store for collison detection
var blocksRight = [];
//loop through blocks and create 2 array of containing the x and y position of the blocks
for(c=0; c<blockColumnCount; c++){
	blocksRight[c] = [];
	for(r=0; r < blockRowCount; r++){

		blocksRight[c][r] = {x: 0, y: 0};
		//console.log(blocksRight[c][r].x, ",", blocksRight[c][r].y);
		
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
		//console.log(blocksLeft[c][r].x, ",", blocksLeft[c][r].y);
		
	}

}

//create a function to draw the right blocks on the page
//loop through the blocks array and store the object location to detect collision later
var drawBlocksRight = function(){


	for(c=0; c<blockColumnCount; c++) {
        for(r=0; r<blockRowCount; r++) {
        	//create a variable to hold offsets for block x and y points
        	var blockX = (c*(blockOffsetLeft));
            var blockY = (r*(blockOffsetTopLeft)+100);

            //add the created offset to blocks, it currently interchanges from top and bottom row points
            blocksRight[c][r].x = blockX;
            blocksRight[c][r].y = blockY;
            // console.log(blocksRight[c][r].x, ",", blocksRight[c][r].y);

            ctx.beginPath();
            ctx.rect(blockX, blockY, blockWidth, blockHeight);
            ctx.stroke();

        }
    }
}





//create random number for the left blocks for variation in the game between 4-7
//have this as a function call
//variable to hold random number
var random = 0;
//random number generator function
var getRandomNumber = function(){

	random = Math.floor(Math.random() * (5-0)) + 0;
}

//create a function to draw the left blocks on the page
//loop through the blocks array and store the object location to detect collision later
var drawBlocksLeft = function(){


	for(c=0; c<blockColumnCount; c++) {
        for(r=0; r<blockRowCount; r++) {
        	//create a variable to hold offsets for block x and y points
        	var blockX = (c*(blockOffsetRight) + 200);
            var blockY = (r*(blockOffsetTopRight)+250);

            //add the created offset to blocks, it currently interchanges from top and bottom row points
            blocksLeft[c][r].x = blockX;
            blocksLeft[c][r].y = blockY;
            //console.log(blocksLeft[c][r].x, ",", blocksLeft[c][r].y);

            ctx.beginPath();
            ctx.rect(blockX, blockY, blockWidth, blockHeight);
            ctx.stroke();

        }
    }
}

//call random number before drawing left blocks to vary count
//getRandomNumber();
//

//COLLSION DETECTION
//
//collision logic calls checkcollion which return true
function collisionDetection() {
    
           
		console.log("collion")
		//call checkcollision
		checkCollision();
            
       
}

//checks if hero x location is in the array of objects and if so returns true for left side
	var checkCollision = function(){

		//loop through right blocks to check for collision
		for(var c=0; c<blockColumnCount; c++){

			for(var r =0; r < blockRowCount; r++){

						console.log(blockColumnCount);
						console.log(blockRowCount);
						console.log(c);
						console.log(r);

						console.log(blocksLeft[c][r].x, ",", blocksLeft[c][r].y);
            			console.log(hero.body.y);

            	//check if hero body has touched any of the blocks
				if(hero.body.x >= blocksLeft[c][r].x && hero.body.y === blocksLeft[c][r].y - heroRadius){
					
					//stop motion
                    dy = 0;
				}
				if(hero.body.x <= blocksRight[c][r].x && hero.body.y === blocksRight[c][r].y - heroRadius){

					 console.log(blocksRight[c][r].x, ",", blocksRight[c][r].y);
            		console.log(hero.body.x);
					console.log("its a hit");
					//stop motion
					dy = 0;
				}
				else{

					//do nothing
				 }
			}
		}
	}

//RUN GAME
//
//function to draw game and animate it 
//calls blocks and hero 
//hero drops at a constant velocity
var animateCanvas = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //call left blocks
	drawBlocksLeft();
	//call right blocks
	drawBlocksRight();
	//places hero on the board
    hero.drawBody();

    collisionDetection();
    
    //constant drop added to hero
    hero.body.y += dy;

    window.requestAnimationFrame(animateCanvas);
}

	//initializes hero for the game
	hero.initHero();
	animateCanvas();



