// dimension of canvas
var _width = 400;
var _height =500;
// pos of vehicle
var w = (_width/2)-10,h=_height-30;
// Used Object
var bob;
var bullets = [];
var hurdles = [];
var centipedes = [];
//dist btw vehicle and hurdle
var dx = [];
var dy = [];
// Grid dimension
var mult =20;
var centiLen;
var len;
var score = 0;
var pau = true;
var ovr = false;
var reset = false;
var speed = 5;

function setup() {
	createCanvas(_width,_height);
	rectMode(CENTER);
	bob = new Vehicle(w,h);
	frameRate(30);
	// Making of random hurdles
	for(var j =40;j<height-100;j+=mult){
		for(var i =20;i<width-20;i+=mult){
			if(round(random(0,10))==1){
				var hurdle = new Hurdle(i+10,j+10);
				hurdles.push(hurdle);
			}
		}
	}
	// setTimeout(respawnHurdle,5000);

	centiLen = round(random(8,12));
	len = centiLen;
	var y = 10;
	for(var i = len;i>0;i--){
			var centipede = new Centipede(w,y);
			centipedes.push(centipede);
			y-=20;
		}
}

function draw() {
	background(51);
	// Show bullets, check bullet collision with hurdel and centipede
	for (var i = bullets.length - 1; i >= 0; i--) {
		bullets[i].show();
		var validH = bullets[i].collisionH(i);
		if(validH ==0) {								//check if the bullet is already spliced
			var validC = bullets[i].collisionC(i);
			if(validC ==0){
				if(bullets[i].y<0){
					bullets.splice(i,1);
				}
			}
		}
	}

	// to show the vehicle
	bob.show();

	// show the dotted grid
	// push();
	// stroke(255);
	// for(var i =0;i<width;i+=mult){
	// 	for(var j =0;j<height;j+=mult){
	// 		point(i,j);
	// 	}
	// }
	// pop();
	// End of dotted grid


	// To make a centipede when length of centipede is zero
	if(centipedes.length == 0){
		centiLen = round(random(8,12));
		x = w;
		for(var i = centiLen;i>0;i--){
			var centipede = new Centipede(x,30);
			centipedes.push(centipede);
			x+=20;
		}
	}
	// End of making of centipede


	// show the centipede
	for (var i = centipedes.length - 1; i >= 0; i--) {
		centipedes[i].show();
		if(centipedes[i].x>480){						// check if the centipede is out of frame if
			centipedes.splice(i,1);						// yes splice it
		}
	}

	if(centipedes.length ==1){
		speed = 10;
	} else {
		speed = 5;
	}
	for (var i = centipedes.length - 1; i >= 0; i--) {
		if(centipedes[i].y<30){
			centipedes[i].y += speed;
		} else {
		centipedes[i].movement();
		}
	}

	//show the hurdles
	for (var i = hurdles.length - 1; i >= 0; i--) {
		hurdles[i].show();
		if(hurdles[i].radius<=0 || hurdles[i].spil == true){		// check if the hurdle has radius of 0 if
			hurdles.splice(i,1);									// yes splice it
		}
	}


	// check the collision between vehicle and hurdle if yes stop the vehicle to move in that direction
	for (var i = 0; i < hurdles.length; i++) {
		dx[i]= (hurdles[i].x-bob.x);
		dy[i]= (hurdles[i].y-bob.y);
	}
	for (var i = 0; i < hurdles.length; i++) {
		if(dx[i] == -20 && (hurdles[i].y == bob.y || hurdles[i].y+10 == bob.y || hurdles[i].y-10 == bob.y )){
			bob.mLeft = false;
			bob.validMxn = 0;
			break;
		} else{
			bob.validMxn = 1;
		}

		if(dx[i]==20 && (hurdles[i].y == bob.y || hurdles[i].y+10 == bob.y || hurdles[i].y-10 == bob.y )){
			bob.mRight = false;
			bob.validMxp = 0;
			break;
		} else{
			bob.validMxp = 1;
		}

		if(dy[i] == -20 && (hurdles[i].x == bob.x || hurdles[i].x+10 == bob.x || hurdles[i].x-10 == bob.x) ){
			bob.mUp = false;
			bob.validMyn = 0;
			break;
		} else{
			bob.validMyn = 1;
		}
		if(dy[i]==20 && (hurdles[i].x == bob.x || hurdles[i].x+10 == bob.x || hurdles[i].x-10 == bob.x) ){
			bob.mDown = false;
			bob.validMyp = 0;
			break;
		} else{
			bob.validMyp = 1;
		}
	}
	// End of vehicle and hurdle collision







	push();
	fill(165,175,255);
	rect(width/2,10,_width,20);
	rect(10,height/2,20,_height);
	rect(width-10,height/2,20,_height);
	rect(width/2,height-10,_width-40,20);
	pop();

	push();
	textSize(23);
	if(score<=100){
		fill(255);
	}else if(score>100 && score<=500){
		fill(102, 51, 0);
	} else if(score>500 && score<=1000){
		fill(0, 255, 0);
	} else if(score>1000 && score<=5000){
		fill(102, 0, 102);
	} else if(score>5000 && score<=10000){
		fill(0, 0, 102);
	}
	text("Score:"+score,250,18);
	pop();

	if(ovr){
		push();
		textSize(25);
		fill(255, 0, 0);
		text("GAME OVER",width/2-80,height-1);
		pop();
		pau = true;
	}
	if(pau){
		noLoop();
	}
}

function keyPressed(){
	if(keyCode == LEFT_ARROW){
		bob.mLeft = true;
	} else if(keyCode == RIGHT_ARROW){
		bob.mRight = true;
	} else if(keyCode == UP_ARROW){
		bob.mUp = true;
	} else if(keyCode == DOWN_ARROW){
		bob.mDown = true;
	}

	if(key =='P' && pau == false){
    	pau = true;
      	noLoop();
  	}else if(key =='P' && pau == true){
		if(ovr){
			r();
		}
    	pau = false;
      	loop();
  	}

}
function keyReleased(){
	if(keyCode == LEFT_ARROW){
		bob.mLeft = false;
	} else if(keyCode == RIGHT_ARROW){
		bob.mRight = false;
	} else if(keyCode == UP_ARROW){
		bob.mUp = false;
	} else if(keyCode == DOWN_ARROW){
		bob.mDown = false;
	}
}
function keyTyped(){
	if(key == ' '){
		var bullet1 = new Bullet(bob.x,bob.y-10);
		bullets.push(bullet1);
		// var bullet2 = new Bullet(bob.x,bob.y-107);
		// bullets.push(bullet2);
	}
}

function r(){
	score = 0;
	pause = false;
	ovr = false;
	centipedes.splice(0,centipedes.length);
	bob.x = w;
	bob.y = h;
}

function respawnHurdle(){
	var valid = 0;
	var posx, posy;
	for(var j =40;j<height-100;j+=mult){
		for(var i =20;i<width-20;i+=mult){
			for (var k = 0; k < hurdles.length ; k++){
				if(hurdles[k].x != i+10 && hurdles[k].y != j+10){
					// console.log(valid);
					valid = 1;
					posx = i;
					posy = j;
					break;
				}
			}
		}
	}
		if(valid == 1){
			var hurdle = new Hurdle(posx+10,posy+10);
			hurdles.push(hurdle);
		}

		// setTimeout(respawnHurdle,5000);
}
