function Hurdle(x,y){
	this.x = x;
	this.y = y;
	this.radius = 20;
	this.spil = false;
}

Hurdle.prototype.show = function() {
	// console.log("hii");
	push();
	strokeWeight(2);
	stroke(255, 102, 0);
	fill(0, 204, 153)
	ellipse(this.x,this.y,this.radius,this.radius);
	pop();

	this.checkhurdle();
}

Hurdle.prototype.checkhurdle = function(){

	for (var i = hurdles.length - 1; i >= 0; i--) {
		var dx = hurdles[i].x - this.x;
		var dy = hurdles[i].y == this.y;
		if(dx <0){
			dx*=-1;
		} if(dy <0){
			dy*=-1;
		}
		if(dx==20 && dy==20){
			this.spli == true;
		}
	}

}
