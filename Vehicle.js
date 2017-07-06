function Vehicle(w,h){
	this.x = w;
	this.y = h;
	this.w = 20;
	this.mDown = false;
	this.mUp = false;
	this.mLeft = false;
	this.mRight = false;
	this.validMxp = 1;
	this.validMxn = 1;
	this.validMyp = 1;
	this.validMyn = 1;
}

Vehicle.prototype.show = function(){
	this.collide();
	noStroke();
	rect(this.x,this.y,this.w,this.w);
	push();
	fill(255,0,0);
	rect(this.x,this.y-12,4,4);
	pop();
	fill(0,0,255);
	this.moveDown();
	this.moveUp();
	this.moveLeft();
	this.moveRight();
}

Vehicle.prototype.moveDown = function() {
	if(this.mDown && this.y<500-30 && this.validMyp ==1){
		this.y += 10;
	} else{
		this.y+=0;
	}
}
Vehicle.prototype.moveUp = function() {
	if(this.mUp && this.y>30 && this.validMyn ==1){
		this.y -= 10;
	} else{
		this.y+=0;
	}
}
Vehicle.prototype.moveLeft = function() {
	if(this.mLeft && bob.x>30 && this.validMxn ==1){
		this.x -= 10;
	} else{
		this.x+=0;
	}
}
Vehicle.prototype.moveRight = function() {
	if(this.mRight && bob.x<400-30 && this.validMxp ==1){
		this.x += 10;
	} else{
		this.x+=0;
	}
}
Vehicle.prototype.shoot = function() {
	push();
	stroke(255);
	rect(this.gx+9,this.gy-3);
	pop();
}

Vehicle.prototype.collide = function() {
	for (var j = centipedes.length - 1; j >= 0; j--) {
		var dx = centipedes[j].x-this.x;
		var dy = centipedes[j].y-this.y;
		if(dx<0){
			dx*=-1;
		} if(dy<0){
			dy*=-1;
		}
		if(dx==20 && (centipedes[j].y == this.y || (centipedes[j].y+10 > this.y && centipedes[j].y-10 < this.y))){
			ovr = true;
			pau = true;
		}
		if(dy<20 && (centipedes[j].x == this.x || (centipedes[j].x+10 >= this.x && centipedes[j].x-10 <= this.x))){
			ovr = true;
			pau = true;
		}
	}
}
