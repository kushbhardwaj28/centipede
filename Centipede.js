function Centipede(x,y){
	this.x = x;
	this.y = y;
	this.radius = 20;
	this.chance = round(random(0,1));
	this.ml = false;
	this.mr = true;
	this.mt = false;
	this.mb = true;
	this.speed = 5;
}

Centipede.prototype.show = function() {
	push();
	strokeWeight(2);
	stroke(255, 255, 0);
	fill(255, 0, 255)
	ellipse(this.x,this.y,this.radius,this.radius);
	pop();
	this.collide();
}

Centipede.prototype.moveL = function() {
	this.x -=this.speed;
}
Centipede.prototype.moveR = function() {
	this.x +=this.speed;
}

Centipede.prototype.movement = function() {

	for (var j = hurdles.length - 1; j >= 0; j--) {

		var differx = hurdles[j].x-this.x;
		var differy = hurdles[j].y-this.y;
		if(((differx == -20 || differx == 20) && hurdles[j].y == this.y) || this.x == width-30 || this.x == 30){
			if(this.y == height-30 && this.y!=30){
				this.mu = true;
				this.mb = false;
			} else if(this.y != height-30 && this.y==30){
				this.mb = true;
				this.mu = false;
			}
			if(this.mb ==true){
				this.y += 20;
			} else if(this.mu == true){
				this.y -= 20;
			}
			if(this.mr ==true){
				this.mr = false;
				this.ml = true;
			} else if(this.ml == true){
				this.ml = false;
				this.mr = true;
			}
			break;

	}
}
	if(centipedes.length ==1){
		this.speed = 10;
	} else {
		this.speed = 5;
	}
	if(this.mr == true){
		this.moveR();
	} else if(this.ml == true){
		this.moveL();
	}
}

Centipede.prototype.collide = function() {
	for (var j = centipedes.length - 1; j >= 0; j--) {
		var differx = centipedes[j].x-this.x;
		if(differx<0){
			differx *=-1;
		}
		if((( differx == 10) && centipedes[j].y == this.y)){
			if(this.y == height-30 && this.y!=30){
				this.mu = true;
				this.mb = false;
			} else if(this.y != height-30 && this.y==30){
				this.mb = true;
				this.mu = false;
			}
			if(this.mb ==true){
				this.y += 20;
			} else if(this.mu == true){
				this.y -= 20;
			}
			if(this.mr ==true){
				this.mr = false;
				this.ml = true;
			} else if(this.ml == true){
				this.ml = false;
				this.mr = true;
			}
			break;
		}
	}
	// if(this.mr == true){
	// 	this.moveR();
	// } else if(this.ml == true){
	// 	this.moveL();
	// }
}
