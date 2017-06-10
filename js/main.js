console.log("hi");

//grabing 2d canvas to work on
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//image graphics
var image = document.getElementById('source');
var barrier = document.getElementById('barrier');
var chest = document.getElementById('treasure');

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

//variable to stop animation if game over
var doAnim=true;

//booster item hit detection
var booster = false;
var frameCounter =0;


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
    	//ctx.drawImage(image,hero.body.x-20, hero.body.y-25, 50, 50);
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

				//determines if booster item is hit and speeds up hero	
				if(booster){
					console.log('booster')
					while(frameCounter< 600){
					dy=4;
					frameCounter++;
					}
					frameCounter= 0;
					booster=false;
				}else{
			 		dy=1;
			    }
			}
			//move the hero x position 10 to the left
		}else if(hero.direction === "left"){

			//keeps hero on canvas
			if(hero.body.x > heroRadius){
			hero.body = {x: hero.body.x - 10, y: hero.body.y, r: 10, e: 0}
				
				//determines if booser item is hit and speeds up hero
				if(booster){
					while(frameCounter< 600){
					dy =4;
					frameCounter++;
					}
					frameCounter =0;
					booster=false;
				}else{
			 		dy=1;
			    }
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
var levelArray = [{x: 300, y: 50, xMax: 400}, //0
				  {x: 0, y: 100, xMax: 100},//1
				  {x: 0, y: 200, xMax: 150},//2
				  {x:200,y:250, xMax: 300},//3
				  {x:0 , y: 300, xMax:150},//4
				  {x:150, y:350, xMax:300}, //5
				  {x:0,   y:400, xMax:200}, //6 
				  {x:0, y:500,   xMax:150}, //7 
				  {x:200, y:550, xMax:400}, //8
				  {x:0, y:600, xMax:100}, //9 
				  {x:0, y:650, xMax:250}, //10 
				  {x:300, y:700, xMax:400}, //11    
				  {x:200, y: 150, xMax:250}, //12
				  {x:200, y: 150, xMax:300}, //13
				  {x:200, y: 150, xMax:350}, //14
				  {x:200, y: 150, xMax:400}, //15
				  {x:200, y:450, xMax:250}, //16
				  {x:200, y:450, xMax:300}, //17
				  {x:200, y:450, xMax:350}, //18
				  {x:200, y:450, xMax:400}, //19
				  ];
//array to hold the x and y position of the items on the canvas
var itemsArray = [{x: 290, y: 200, status: 1},
				  {x: 60, y: 350, status: 1},
				  {x: 290, y:500, status: 1},
				  {x: 60, y: 600, status: 1}];

//function to draw the game board on the canvas
//draws four lines that will later move
//might have to add argument to take values to be able to move lines up and down
var drawLines= function(){

	var picOffset = 30;

	for(var i = 0; i < 12; i++){
		
		if(i ===0 || i === 2 || i === 4 || i === 5 || i === 7){

			//put them in for loops
			for(var k = 0; k < 5; k++){

			ctx.drawImage(barrier,(levelArray[i].x - 10) + picOffset * k, levelArray[i].y-20, 50, 50);

			}

		}else if(i === 1 || i === 3){
				for(var k = 0; k < 3; k++){

			ctx.drawImage(barrier,(levelArray[i].x - 10) + picOffset * k, levelArray[i].y-20, 50, 50);

			}


		}else if (i === 6 || i === 8){
			for(var k = 0; k < 7; k++){

			ctx.drawImage(barrier,(levelArray[i].x - 10) + picOffset * k, levelArray[i].y-20, 50, 50);

			}	

		}else if (i === 9 || i === 11){
			for(var k = 0; k < 3; k++){

			ctx.drawImage(barrier,(levelArray[i].x - 10) + picOffset * k, levelArray[i].y-20, 50, 50);

			}	

		}else if (i === 10){
			for(var k = 0; k < 8; k++){

			ctx.drawImage(barrier,(levelArray[i].x - 10) + picOffset * k, levelArray[i].y-20, 50, 50);

			}	

		}

		// ctx.beginPath();
		// ctx.moveTo(levelArray[i].x, levelArray[i].y);
		// ctx.lineTo(levelArray[i].xMax, levelArray[i].y);
		// ctx.stroke();
	}

	
	for(var i = 0; i < 2; i++){
		
		if(i === 0){

			//put them in for loops
			if(randomTop ===12){
			  	for(var k = 0; k < 2; k++){

			ctx.drawImage(barrier,(levelArray[randomTop].x - 10) + picOffset * k, levelArray[randomTop].y-20, 50, 50);

			}	
			  
			}else if(randomTop ===13){
					  	for(var k = 0; k < 3; k++){

			ctx.drawImage(barrier,(levelArray[randomTop].x - 10) + picOffset * k, levelArray[randomTop].y-20, 50, 50);

			}

			}else if(randomTop ===14){
					  	for(var k = 0; k < 5; k++){

			ctx.drawImage(barrier,(levelArray[randomTop].x - 10) + picOffset * k, levelArray[randomTop].y-20, 50, 50);

			}

			}else if(randomTop ===15){
					  	for(var k = 0; k < 6; k++){

			ctx.drawImage(barrier,(levelArray[randomTop].x - 10) + picOffset * k, levelArray[randomTop].y-20, 50, 50);

			}

			}
			// ctx.beginPath();
			// ctx.moveTo(levelArray[randomTop].x, levelArray[randomTop].y);
			// ctx.lineTo(levelArray[randomTop].xMax, levelArray[randomTop].y);
			// ctx.stroke();

		}
		else{

			if(randomBottom ===16){
			  for(var k = 0; k < 2; k++){

			ctx.drawImage(barrier,(levelArray[randomBottom].x - 10) + picOffset * k, levelArray[randomBottom].y-20, 50, 50);

			}	
			  
			}else if(randomBottom ===17){
			  for(var k = 0; k < 3; k++){

			ctx.drawImage(barrier,(levelArray[randomBottom].x - 10) + picOffset * k, levelArray[randomBottom].y-20, 50, 50);

			}	
			 

			}else if(randomBottom ===18){
				  for(var k = 0; k < 5; k++){

			ctx.drawImage(barrier,(levelArray[randomBottom].x - 10) + picOffset * k, levelArray[randomBottom].y-20, 50, 50);

			}	
			 

			}else if(randomBottom ===19){
	  			for(var k = 0; k < 6; k++){

				ctx.drawImage(barrier,(levelArray[randomBottom].x - 10) + picOffset * k, levelArray[randomBottom].y-20, 50, 50);

			}	
			 

			}

			// ctx.beginPath();
			// ctx.moveTo(levelArray[randomBottom].x, levelArray[randomBottom].y);
			// ctx.lineTo(levelArray[randomBottom].xMax, levelArray[randomBottom].y);
			// ctx.stroke();
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

				ctx.drawImage(chest,  itemsArray[i].x, itemsArray[i].y, 50, 50);
				// ctx.beginPath();
	   //          ctx.rect(itemsArray[i].x, itemsArray[i].y, itemWidth, itemHeight);
	   //          ctx.fillStyle = "#0095DD";
	   //          ctx.fill();
	   //          ctx.closePath();
	        }

        }
}


//create random number for the left blocks for variation in the game between 4-7
//have this as a function call
//variable to hold random number

//random number generator function for top and bottom left lines
var getRandomTop = function(){

	randomTop= Math.floor(Math.random() * (15-12)+12);
	
}

var getRandomBottom = function(){

	randomBottom = Math.floor(Math.random()*(19-16)+ 16);
}


//COLLSION DETECTION
//
//collision logic checks if ball is between the min and max range for a line on y axis
//if it is between it is stopped in its tracks
//if it goes outside of it to 200 range it begins falling again :)
 
function collisionDetection() {
    
			
				//checks the array for a collison along the lines according to hero position on canvas
				if(checkDetection()=== true ||
				(hero.body.y=== levelArray[randomTop].y - heroRadius && (hero.body.x > levelArray[randomTop].x && hero.body.x < levelArray[randomTop].xMax))||
				(hero.body.y=== levelArray[randomBottom].y - heroRadius && (hero.body.x > levelArray[randomBottom].x && hero.body.x < levelArray[randomBottom].xMax))

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

var checkDetection = function(){

	var check = false;
	for(var i = 0; i < 12; i++){


		if((hero.body.y=== levelArray[i].y - heroRadius && (hero.body.x > levelArray[i].x && hero.body.x < levelArray[i].xMax))){

						check = true;
		}
		
	}

	return check;
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
	                var frameCounter = 0;
	                
	                 	//booster item hit, need to determine which item is a booster item
	                 	booster = true;
	                 	console.log("invisible");
	                	
	      

	                	

	                	
	                	
	                	
	                

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




    collisionDetection();

    //this logic resets lines after they have moved off the canvas
    //collsion must be detected again as lines rise
    for(var i = 0; i < 12; i++){
	    if(levelArray[i].y === -50){

	    	levelArray[i].y = 700;
	    }
	       

	}
       

    if(levelArray[randomTop].y === -50){


  		getRandomTop();
    	levelArray[randomTop].y = 700;

    }
       if(levelArray[randomBottom].y === -50){

       	getRandomBottom();
    	levelArray[randomBottom].y = 700;

  

    }


    //put in for loop
    //this logic resets items

    for(var i = 0; i < 4; i++){
	    if(itemsArray[i].y === -50){


	    	itemsArray[i].y = 700;
	    	if(itemsArray[i].status === 0){

	    		itemsArray[i].status = 1;
	    		drawItems();
	    	}
	    }
  
	}
  



    //this moves the lines up the canvas
    for(var i = 0; i < 12; i++){
	    levelArray[i].y = levelArray[i].y - 1;
	    
	 }

    levelArray[randomTop].y = levelArray[randomTop].y - 1;
    levelArray[randomBottom].y = levelArray[randomBottom].y - 1;


    //this moves boxes up the canvas
    for(var i = 0; i < 4; i++){
	    itemsArray[i].y = itemsArray[i].y -1;
   

		}
    
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


