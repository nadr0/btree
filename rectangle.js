/*
	rectangelBoundary 
		- Object

		Used to create the btree when displaying/rendering
			- background rectangles are NOT drawn
				* Background rectangles store nodes which are rectangles 
			- non background rectangles are drawn
				* They are the nodes to be drawn with the keys
*/
function rectangleBoundary(left,right,top,bottom,horizontalSpacing,bg,fill,stroke){

	/* x coordinate */
	this.left = left;
	/* width of rectangle */
	this.right = right;
	/* y coordinate */
	this.top = top;
	/* height of rectangel */
	this.bottom = bottom;

	/* 
		SITE_WIDTH/number of nodes in a rectangle + 1
		This is to properly space the nodes horizontally when drawn.	
	*/
	this.horizontalSpacing = horizontalSpacing;

	/* Stores nodes to be drawn, rectangleBoundary of the nodes are here*/
	this.nodes = [];

	/* True or false */
	this.background = bg;

	/* Fill style for the rectangle when drawn */
	this.fill_style = fill;

	/* Stroke style for the rectangle when drawn */
	this.stroke_style = stroke;

	/* Draws the rectangle when created */
	this.draw();

	/* Store the children */
	this.C = [];

	/* Store the keys of the node */	
	this.keys = [];

	/* Store text centers */
	this.textCenters = [];
}


/*
	Renders a rectangle 
		- background rectangles are NOT drawn, used for storage
		- non background rectangles are nodes which are drawn
*/
rectangleBoundary.prototype.draw = function(){


	/* 
		Don't draw background rectangles
		i.e., Background rectangles store the nodes to be drawn 
	*/
	if(!this.background){
		/* Draw the node rectangel */

		context.beginPath();
		/* Edge width around the rectangle */
		context.lineWidth = 10;
		context.rect(this.left, this.top, this.right, this.bottom);
		context.fillStyle = this.fill_style;
		context.strokeStyle = this.stroke_style;
		context.stroke();
		context.fill();
		context.closePath();
	}
}



rectangleBoundary.prototype.calculateTextCenters = function(lineSpacing,m){

	for(var i = 0; i < m; i++){
		this.textCenters.push(this.left + (i * (lineSpacing)) + (lineSpacing/2));
	}
}








