function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function controlBox(x,y,height){
	this.x = x;
	this.y = y;
	this.height = height;

	this.width = 10;

	this.box_x = this.x;

	this.hover = false;
	this.maxOffSet = 110;	
}


controlBox.prototype.update = function(){

	/* Check if the mouse is inside this control box */
	if(mousePos.x > this.x && mousePos.x < this.x + this.maxOffSet - this.width && mousePos.y > this.y - this.height/2 && mousePos.y < this.y + this.height - this.height/2){
		/* Mouse is inside the box */
		this.hover = true;
		this.move();
	}else{
		this.hover = false;
	}

	this.draw();

}

controlBox.prototype.draw = function(){
	/* Clear the control region */
	// context.clearRect(this.x,this.y - this.height/2,this.width,this.height);

	/* Fill in the region */
	context.beginPath();
	context.rect(this.x,this.y - this.height/2,this.maxOffSet + this.width,this.height + 1);
        context.fillStyle = "#ecf0f1";
        context.fill();

        /* Draw controls */

	/* Draw line to determine range of values */
	context.beginPath();
	context.strokeStyle = "black";
	context.moveTo(this.x,this.y);
	context.lineTo(this.x + this.maxOffSet,this.y);
	context.stroke();
	context.closePath();


	/* Draw the control box*/
	context.fillStyle = "blue";
	context.rect(this.box_x,this.y - this.height/2, this.width ,this.height);
	context.fill();

}

controlBox.prototype.move = function(){
	if(mouseDown){
		this.box_x = mousePos.x;
		btree.update();
	}
}