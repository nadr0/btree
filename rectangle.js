function rectangleBoundary(left,right,top,bottom,horizontalSpacing){

	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;

	this.horizontalSpacing = horizontalSpacing;

	this.nodes = [];

	/* Debug */
	this.draw();
}


/*
	Debug
		- To see rectangle boundary
*/
rectangleBoundary.prototype.draw = function(){
	context.rect(this.left, this.top, this.right, this.bottom);
	context.stroke();
}