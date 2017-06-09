console.log("hi");

//grabing 2d canvas to work on
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// //hero drop velocity 
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

		this.body = {x: 100, y:10, r: 10, e: 0};
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

			hero.body = {x: hero.body.x - 10, y: hero.body.y, r: 10, e: 0}
		}
	}
}

//movement for hero, listens to key down only right and left
document.addEventListener('keydown', function(event){
  var key = event.which;
  if(key === 39){
    hero.direction = "right";
     hero.move();
  	hero.drawBody();
  }else if(key === 37){
    hero.direction = "left";
     hero.move();
  	hero.drawBody();
  }
  console.log(key);
 
});


//GAMEBOARD
//
//
//array to hold the line obstacles that make up the level;
//keeps a min and max for each row along the x axis
var levelArray = [{x: 0, y: 100, xMax: 200}, 
				  {x: 0, y: 400, xMax: 200}, 
				  {x:200, y: 250, xMax:400},
				  {x:200, y:550, xMax:400}];

//function to draw the game board on the canvas
//draws four lines that will later move
//might have to add argument to take values to be able to move lines up and down
var drawLines= function(){

	for(var i = 0; i < 4; i++){
		ctx.beginPath();
		ctx.moveTo(levelArray[i].x, levelArray[i].y);
		ctx.lineTo(levelArray[i].xMax, levelArray[i].y);
		ctx.stroke();
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



//COLLSION DETECTION
//
//collision logic checks if ball is between the min and max range for a line on y axis
//if it is between it is stopped in its tracks
//if it goes outside of it to 200 range it begins falling again :)
function collisionDetection() {
    
           
		
		//checks the array for a collison along the lines according to hero position on canvas
		for(var i = 0; i < levelArray.length; i++){

			//if the hero touches the line he is frozen and can only move left or right till he gets to 200
			//might have to add logic to test when random number is less that for for middle
			// the hero will be able to fall at different points when random is introduced
			if(hero.body.y=== levelArray[i].y - heroRadius && (hero.body.x > levelArray[i].x && hero.body.x < levelArray[i].xMax) ){

				console.log("detection");

				dy= 0;
			

			}else if(hero.body.x === 200 && hero.body.y != 700- heroRadius){

				dy= 2;

				
			}else if(hero.body.y === 700- heroRadius){

				dy=0;
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
    
    drawLines();
    
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



