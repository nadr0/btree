function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function controlBox(x,y,height,message){
	this.x = x;
	this.y = y;
	this.height = height;

	this.width = 10;


	this.hover = false;
	this.maxOffSet = 110;	

	this.message = message;

	this.box_x = this.x + this.maxOffSet/2 - 5;
}


controlBox.prototype.update = function(){

	if(mouseDown){
		/* Check if the mouse is inside this control box */
		if(mousePos.x > this.x && mousePos.x < this.x + this.maxOffSet - this.width && mousePos.y > this.y - this.height/2 && mousePos.y < this.y + this.height - this.height/2){
			/* Mouse is inside the box */
			this.hover = true;
			this.move();
		}
	}else{
		this.hover = false;
	}
	
	this.draw();
	this.info(this.message);
}

controlBox.prototype.draw = function(){
	/* Clear the control region */

	/* Fill in the region */
	context.beginPath();
	context.rect(this.x,this.y - this.height/2,this.maxOffSet + this.width,this.height + 1);
   	context.fillStyle = "#ecf0f1";
    	context.fill();

    	/* Draw controls */

	/* Draw line to determine range of values */
	context.beginPath();
	context.strokeStyle = "#34495e";
	context.moveTo(this.x,this.y);
	context.lineTo(this.x + this.maxOffSet,this.y);
	context.stroke();
	context.closePath();

	context.beginPath();
	/* Draw the control box*/
	context.fillStyle = "#bdc3c7";
	context.strokeStyle = "#34495e";
	context.rect(this.box_x,this.y - this.height/2, this.width ,this.height);
	context.fill();
	context.stroke();
	context.closePath();

}

controlBox.prototype.move = function(){
	if(mouseDown){
		this.box_x = mousePos.x;
		btree.update();
	}
}

controlBox.prototype.info = function(message){
	/* 
		Clear the background of the text on the canvas
		Because this will be in the update loop
	*/
	context.beginPath();
	context.rect(this.x,this.y - 35,context.measureText(message).width,20);
	context.fillStyle = "#ecf0f1";
	context.fill();
	context.closePath();

	context.beginPath();
	context.fillStyle = "black";
	context.fillText(message, this.x, this.y - 20);
	context.closePath();

}
