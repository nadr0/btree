function rectangleBoundary(left,right,top,bottom,horizontalSpacing,bg){

	this.left = left;
	this.right = right;
	this.top = top;
	this.bottom = bottom;

	this.horizontalSpacing = horizontalSpacing;

	this.nodes = [];

	this.background = bg;

	/* Debug */
	this.draw();

	/* Stores parent rect */
	this.parent = null;

}


/*
	Debug
		- To see rectangle boundary
*/
rectangleBoundary.prototype.draw = function(){


  	var backgroundColors = ["","#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#f1c40f","#e67e22","#e74c3c","#95a5a6"];
        var borderColors = ["","#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50","#f39c12","#d35400","#c0392b","#7f8c8d"];
	var randomColorIndex = Math.floor((Math.random() * 9) + 1);

	if(!this.background){
		context.beginPath();
		context.rect(this.left, this.top, this.right, this.bottom);
		context.fillStyle = backgroundColors[randomColorIndex];
		context.strokeStyle = borderColors[randomColorIndex];
		context.stroke();
		context.fill();
		context.closePath();
	}
}