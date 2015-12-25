function rectangleBoundary(left,right,top,bottom,horizontalSpacing,bg,fill,stroke){

	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;

	this.horizontalSpacing = horizontalSpacing;

	this.nodes = [];

	this.background = bg;

	this.fill_style = fill;
	this.stroke_style = stroke;

	/* Debug */
	this.draw();

	/* Store the children */
	this.C = [];

	this.keys = [];

	this.background_spacing = 0;
}


/*
	Debug
		- To see rectangle boundary
*/
rectangleBoundary.prototype.draw = function(){

	if(!this.background){
		context.beginPath();
		context.lineWidth = 10;
		context.rect(this.left, this.top, this.right, this.bottom);
		context.fillStyle = this.fill_style;
		context.strokeStyle = this.stroke_style;
		context.stroke();
		context.fill();
		context.closePath();
	}else{
		context.beginPath();
		context.moveTo(this.left, this.bottom);
		context.lineTo(this.right, this.bottom);
		context.stroke();
		context.closePath();
	}
}