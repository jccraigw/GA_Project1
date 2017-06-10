console.log("hi");

//grabing 2d canvas to work on
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var image = document.getElementById('source');
var barrier = document.getElementById('barrier');

// //hero drop velocity 
var dy = 1;
//variable to hold the heros radius to be used in collision detection
var heroRadius = 10;

//random numbers for left side top and bottom lines
var randomTop= 0;
var randomBottom = 0;

//variables to hold the items height and width
var itemWidth = 50;
var itemHeight = 50; 


var doAnim=true;


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

		this.body = {x: 250, y:10, r: 10, e: 0};
	},
	//draw the hero on the canvas
	drawBody: function(){

		var x = image.width/9;
		var y = image.height;

		var angle =1;;

		if(hero.direction=== 'right'){

				angle =3;

		}else if(hero.direction === 'left'){
			angle = 2;
			
		}

		ctx.beginPath();
    	//ctx.drawImage(image, x * angle, y, 100,100,hero.body.x, hero.body.y, 100,100);
    	ctx.arc(hero.body.x, hero.body.y, 10, 0, Math.PI*2);
    	ctx.fillStyle = "black";
    	ctx.fill();
    	ctx.closePath();

	},
	//move is based off left and right movements only
	//the hero should be constantly falling like gravity
	move: function(){

		if(hero.direction === 'right'){

			//keeps hero on canvas
			if(hero.body.x < canvas.width - heroRadius){
			//move the heros x position 10 to the right
			hero.body = {x: hero.body.x + 10, y: hero.body.y, r: 10, e: 0}
			dy=1;
			}
			//move the hero x position 10 to the left
		}else if(hero.direction === "left"){

			//keeps hero on canvas
			if(hero.body.x > heroRadius){
			hero.body = {x: hero.body.x - 10, y: hero.body.y, r: 10, e: 0}
			dy=1;
			}
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
//added random blocks for left side to add variation then randomly select one each time
var levelArray = [{x: 0, y: 150, xMax: 250}, //0
				  {x: 0, y: 400, xMax: 250},//1
				  {x: 400, y: 450, xMax: 300},//2
				  {x:150,y:300, xMax: 400},//3
				  {x:0 , y: 500, xMax:150},//4
				  {x:0, y:650, xMax:200}, //5  
				  {x:200, y: 700, xMax:250}, //6
				  {x:200, y: 700, xMax:300}, //7
				  {x:200, y: 700, xMax:350}, //8
				  {x:200, y: 700, xMax:400}, //9
				  {x:200, y:550, xMax:250}, //10
				  {x:200, y:550, xMax:300}, //11
				  {x:200, y:550, xMax:350}, //12
				  {x:200, y:550, xMax:400}, //13
				  ];
//array to hold the x and y position of the items on the canvas
var itemsArray = [{x: 290, y: 150, status: 1},
				  {x: 60, y: 300, status: 1},
				  {x: 290, y:500, status: 1},
				  {x: 60, y: 600, status: 1}];

//function to draw the game board on the canvas
//draws four lines that will later move
//might have to add argument to take values to be able to move lines up and down
var drawLines= function(){

	for(var i = 0; i < 6; i++){
		
		if(i ===0){

			drawImg(levelArray[i].x-10, levelArray[i].y-20);
			drawImg(levelArray[i].x+20, levelArray[i].y-20);
			drawImg(levelArray[i].x+50, levelArray[i].y-20);
			drawImg(levelArray[i].x+80, levelArray[i].y-20);
			drawImg(levelArray[i].x+110, levelArray[i].y-20);
			drawImg(levelArray[i].x+140, levelArray[i].y-20);
			drawImg(levelArray[i].x+170, levelArray[i].y-20);
			drawImg(levelArray[i].x+200, levelArray[i].y-20);

		}else if(i === 1){
			drawImg(levelArray[i].x-10, levelArray[i].y-20);
			drawImg(levelArray[i].x+20, levelArray[i].y-20);
			drawImg(levelArray[i].x+50, levelArray[i].y-20);
			drawImg(levelArray[i].x+80, levelArray[i].y-20);
			drawImg(levelArray[i].x+110, levelArray[i].y-20);
			drawImg(levelArray[i].x+140, levelArray[i].y-20);
			drawImg(levelArray[i].x+170, levelArray[i].y-20);
			drawImg(levelArray[i].x+200, levelArray[i].y-20);


		}else if(i ===2){



		}else if(i === 3){



		}else if(i === 4){



		}
		ctx.beginPath();
		ctx.moveTo(levelArray[i].x, levelArray[i].y);
		ctx.lineTo(levelArray[i].xMax, levelArray[i].y);
		ctx.stroke();
	}

	
	for(var i = 0; i < 2; i++){
		
		if(i === 0){


			if(randomTop ===6){
			  ctx.drawImage(barrier,levelArray[randomTop].x , levelArray[randomTop].y-20 , 50, 50);
			  
			}else if(randomTop ===7){
				ctx.drawImage(barrier,levelArray[randomTop].x-10 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+20 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+50 , levelArray[randomTop].y-20 , 50, 50);

			}else if(randomTop ===8){
				ctx.drawImage(barrier,levelArray[randomTop].x-10 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+20 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+50 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+80 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+110 , levelArray[randomTop].y-20 , 50, 50);

			}else if(randomTop ===9){
				ctx.drawImage(barrier,levelArray[randomTop].x-10 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+20 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+50 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+80 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+110 , levelArray[randomTop].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomTop].x+130 , levelArray[randomTop].y-20 , 50, 50);

			}
			ctx.beginPath();
			ctx.moveTo(levelArray[randomTop].x, levelArray[randomTop].y);
			ctx.lineTo(levelArray[randomTop].xMax, levelArray[randomTop].y);
			ctx.stroke();

		}
		else{

			if(randomBottom ===10){
			  ctx.drawImage(barrier,levelArray[randomBottom].x , levelArray[randomBottom].y-20 , 50, 50);
			  
			}else if(randomBottom ===11){
				ctx.drawImage(barrier,levelArray[randomBottom].x-10 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+20 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+50 , levelArray[randomBottom].y-20 , 50, 50);

			}else if(randomBottom ===12){
				ctx.drawImage(barrier,levelArray[randomBottom].x-10 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+20 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+50 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+80 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+110 , levelArray[randomBottom].y-20 , 50, 50);

			}else if(randomBottom ===13){
				ctx.drawImage(barrier,levelArray[randomBottom].x-10 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+20 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+50 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+80 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+110 , levelArray[randomBottom].y-20 , 50, 50);
			ctx.drawImage(barrier,levelArray[randomBottom].x+130 , levelArray[randomBottom].y-20 , 50, 50);

			}

			ctx.beginPath();
			ctx.moveTo(levelArray[randomBottom].x, levelArray[randomBottom].y);
			ctx.lineTo(levelArray[randomBottom].xMax, levelArray[randomBottom].y);
			ctx.stroke();
		}
	}

}

var drawImg = function(x, y){


	ctx.drawImage(barrier, x, y, 50, 50);




}

//draw the items on the screen taking the position from the items array
//if the status is 1 then the brick hasnt been hit and can be drawn
var drawItems = function(){

		for(var i = 0; i < 4; i++){
			if(itemsArray[i].status === 1){
				ctx.beginPath();
	            ctx.rect(itemsArray[i].x, itemsArray[i].y, itemWidth, itemHeight);
	            ctx.fillStyle = "#0095DD";
	            ctx.fill();
	            ctx.closePath();
	        }

        }
}


//create random number for the left blocks for variation in the game between 4-7
//have this as a function call
//variable to hold random number

//random number generator function for top and bottom left lines
var getRandomTop = function(){

	randomTop= Math.floor(Math.random() * (9-6)+6);
	
}

var getRandomBottom = function(){

	randomBottom = Math.floor(Math.random()*(13-10)+ 10);
}


//COLLSION DETECTION
//
//collision logic checks if ball is between the min and max range for a line on y axis
//if it is between it is stopped in its tracks
//if it goes outside of it to 200 range it begins falling again :)
 
function collisionDetection() {
    
			
				//checks the array for a collison along the lines according to hero position on canvas
				if((hero.body.y=== levelArray[0].y - heroRadius && (hero.body.x > levelArray[0].x && hero.body.x < levelArray[0].xMax))||
				(hero.body.y=== levelArray[1].y - heroRadius && (hero.body.x > levelArray[1].x && hero.body.x < levelArray[1].xMax)) ||
				(hero.body.y=== levelArray[randomTop].y - heroRadius && (hero.body.x > levelArray[randomTop].x && hero.body.x < levelArray[randomTop].xMax))||
				(hero.body.y=== levelArray[randomBottom].y - heroRadius && (hero.body.x > levelArray[randomBottom].x && hero.body.x < levelArray[randomBottom].xMax))||
				(hero.body.y=== levelArray[2].y - heroRadius && (hero.body.x > levelArray[2].x && hero.body.x < levelArray[2].xMax))||
				(hero.body.y=== levelArray[3].y - heroRadius && (hero.body.x > levelArray[3].x && hero.body.x < levelArray[3].xMax)) ||
				(hero.body.y=== levelArray[4].y - heroRadius && (hero.body.x > levelArray[4].x && hero.body.x < levelArray[4].xMax))||
				(hero.body.y=== levelArray[5].y - heroRadius && (hero.body.x > levelArray[5].x && hero.body.x < levelArray[5].xMax))

				){

					//this logic will check as long as the object has not reached the top at which point gameover
					if(hero.body.y > heroRadius){
					hero.body = {x: hero.body.x, y: hero.body.y - 2, r: 12.5, e:0}

					}
					else if(hero.body.y ===heroRadius){
						//you lose when you touch between the top and a line
						//game stops
						dy = 0;
						doAnim=false;


						//delay restart to give time to reset
						setTimeout(restartAnimate, 5000);
					}
					console.log('detection');


					
			

				}else{

					dy= +dy;

				}
				//stops ball at the bottom of myCanvas
				if(hero.body.y === 700- heroRadius){

				
				hero.body = {x: hero.body.x, y: hero.body.y - 50, r: 12.5, e:0}

				}


}

//item collision detection
//when it they will disappear from the board
//loop through the items array and compare the location to the heros to determine if hit
var collisionDetection_Items = function(){


	for(var i = 0; i < 4; i++){
		//if hero hits item then dont draw item on screen
		if(itemsArray[i].status === 1){
			if(hero.body.x > itemsArray[i].x && hero.body.x < itemsArray[i].x+itemWidth && hero.body.y > itemsArray[i].y && hero.body.y < itemsArray[i].y+itemHeight) {
	                //item hit so dont draw it
	                itemsArray[i].status = 0;
	            }
		}

	}
}



//RUN GAME
//
//function to draw game and animate it 
//calls blocks and hero 
//hero drops at a constant velocity
//restart the animate after it stops when the hero is between line and top wall
var restartAnimate = function(){


	var context;
	doAnim=true;
	dy= 1;
	hero.body.y = hero.body.y + 20;
	animateCanvas();

}


//function to clear the canvas
var clearCanvas = function(){

	ctx.clearRect(0,0, canvas.width, canvas.height);
}



var animateCanvas = function() {

	//stops the animation and returns nothing
	if(!doAnim){
		
		setTimeout(clearCanvas, 1000);		
		context=null; 
		return;

	}
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //this logic resets lines after they have moved off the canvas
    //collsion must be detected again as lines rise


    collisionDetection();
    if(levelArray[0].y === -50){

    	levelArray[0].y = 700;
    }
       if(levelArray[1].y === -50){

    	levelArray[1].y = 700;

  
    }
    if(levelArray[2].y === -50){

    	levelArray[2].y = 700;
    }
       if(levelArray[3].y === -50){

    	levelArray[3].y = 700;

  
    }
    if(levelArray[4].y === -50){

    	levelArray[4].y = 700;
    }
       if(levelArray[5].y === -50){

    	levelArray[5].y = 700;

  
    }
       if(levelArray[randomTop].y === -50){


  		getRandomTop();
    	levelArray[randomTop].y = 700;

    }
       if(levelArray[randomBottom].y === -50){

       	getRandomBottom();
    	levelArray[randomBottom].y = 700;

  

    }

    //this logic resets items
    if(itemsArray[0].y === -50){


    	itemsArray[0].y = 700;
    	if(itemsArray[0].status === 0){

    		itemsArray[0].status = 1;
    		drawItems();
    	}
    }
       if(itemsArray[1].y === -50){


    	itemsArray[1].y = 700;
    	if(itemsArray[1].status === 0){

    		itemsArray[1].status = 1;
    		drawItems();
    	}
    }
       if(itemsArray[2].y === -50){



    	itemsArray[2].y = 700;
    	if(itemsArray[2].status === 0){

    		itemsArray[2].status = 1;
    		drawItems();
    	}
    }
     if(itemsArray[3].y === -50){



    	itemsArray[3].y = 700;
    	if(itemsArray[3].status === 0){

    		itemsArray[3].status = 1;
    		drawItems();
    	}
    }
  

  



    //this moves the lines up the canvas
    levelArray[0].y = levelArray[0].y - 1;
    levelArray[1].y = levelArray[1].y - 1;
    levelArray[randomTop].y = levelArray[randomTop].y - 1;
    levelArray[randomBottom].y = levelArray[randomBottom].y - 1;
    levelArray[2].y = levelArray[2].y - 1;
    levelArray[3].y = levelArray[3].y - 1;
    levelArray[4].y = levelArray[4].y - 1;
    levelArray[5].y = levelArray[5].y - 1;


    //this moves boxes up the canvas
    itemsArray[0].y = itemsArray[0].y -1;
    itemsArray[1].y = itemsArray[1].y -1;
    itemsArray[2].y = itemsArray[2].y -1;
    itemsArray[3].y = itemsArray[3].y -1;
    
    drawLines();
    drawItems();
     
	//places hero on the board
	
    hero.drawBody();
  	collisionDetection();

	
    
    
    collisionDetection_Items();
     //constant drop added to hero
    hero.body.y += dy;
   

   
    
    
    window.requestAnimationFrame(animateCanvas);
}

	//initializes hero for the game
	getRandomTop();
	getRandomBottom();
	hero.initHero();
	animateCanvas();


	// var context=...
	// doAnim=true;
	// animateCanvas();


