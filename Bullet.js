 function Bullet(x,y){
	this.x = x;
	this.y = y;
	this.w = 2;
	this.h = 14;
}


Bullet.prototype.show = function(){
	noStroke();
	push();
	fill(0,255,0);
	rect(this.x,this.y,this.w,this.h);
	pop();
	this.update();
}

Bullet.prototype.update = function(){
	this.y-=20;
}

// Function to check collision of bullet with hurdle
Bullet.prototype.collisionH = function(i) {
	var valid = 0;
	for (var j = hurdles.length - 1; j >= 0; j--) {
		var differ = hurdles[j].y-((this.y));
		if(differ == 10 && (hurdles[j].x == this.x || (hurdles[j].x+10 >= this.x && hurdles[j].x-10 <= this.x))){
			bullets.splice(i,1);
			hurdles[j].radius-=5;
			score+=10;
			valid =1;
			break;
		}
	}
	if(valid == 1){
		return 1;
	} else{
		return 0;
	}
}

// Function to check collision of bullet with centipede
Bullet.prototype.collisionC = function(i) {
	var valid = 0;
	for (var j = centipedes.length - 1; j >= 0; j--) {
		var differ = centipedes[j].y-(this.y-20);
		if(differ<0){
			differ *=-1;
		}
		if((differ <= 10) && (centipedes[j].x == this.x || (centipedes[j].x+10 >= this.x && centipedes[j].x-10 <= this.x))){
			bullets.splice(i,1);
			var hurdle = new Hurdle(centipedes[j].x,centipedes[j].y);
			hurdles.push(hurdle);
			if(round(random(0,1))==1){
				centipedes[j].mr=true;
			} else{
				centipedes[j].ml = true;
			}
			centipedes.splice(j,1);
			score+=50;
			--centiLen;
			valid =1;
			break;
		}
	}
	if(valid == 1){
		return 1;
	} else{
		return 0;
	}
}
