/* 
	Determines the boundary rectangles for the btree nodes
*/
function setupBoundaries(btree){
	/* Get the height of the btree tree */
	var treeHeight = btree.height;

	/* Pass these ones into functions from here */
	var SITE_WIDTH = window.innerWidth;
	var SITE_HEIGHT = window.innerHeight;
	/* The width of the node in respect to the SITE_WIDTH */
	/* 10 is decent */
	/* 8 if need a taller tree */
	var RECT_WIDTH_PERCENT = (box1.box_x - box1.x)/5;
	/* Every RECT's size is a percent of the SITE_WIDTH */
	var RECT_WIDTH = SITE_WIDTH * (RECT_WIDTH_PERCENT/100);
	/* RECT's height is a third of its width */
	var RECT_HEIGHT = RECT_WIDTH * (1/3);

	/* 
		verticalSpacing is for the dividing of the btree height
	*/
	var verticalSpacing = SITE_HEIGHT/treeHeight;

	/*
		Spacing between each node when drawn 
	*/
	var horizontalSpacing = 0;

	/* Create the height boundaries of the tree */
	for (var i = 0; i < treeHeight; i++) {
		/* For the current height level, calculate the horizontal spacing */
		horizontalSpacing = SITE_WIDTH/(btree.NODE_STORAGE[i].length+1);
		/* Create the rectangle*/
		btree.RECT_STORAGE_DIVIDER[i] =  new rectangleBoundary(0,SITE_WIDTH,0,verticalSpacing*(i+1),horizontalSpacing,1);	
	};

	/*
		---------------------------------
		DRAWS ALL THE NODES IN THE BTREE
		---------------------------------
	*/


	/*
		Variables for they don't have to be declared insided for-loops
	*/
	var current_node;
	var current_rect;
	var left;
	var right;
	var top;
	var bottom;
	var textSpacing;
	var lineSpacing;
	var textWidth;
	var textHeight;
	var sumTextWidth;

	/* Flat UI colors for the nodes */
	var backgroundColors = ["","#1abc9c","#2ecc71","#3498db","#9b59b6","#f1c40f","#e67e22","#e74c3c","#95a5a6"];
	var borderColors = ["","#16a085","#27ae60","#2980b9","#8e44ad","#f39c12","#d35400","#c0392b","#7f8c8d"];

	/* Draw the nodes */
	for (var i = 0; i < treeHeight; i++) {

		/* Get the amount of nodes at this height */
		var STATIC_LENGTH = btree.NODE_STORAGE[i].length;

		for (var j = 0; j < STATIC_LENGTH; j++) {
			/* Go through each node at the height 
				- Shift removes from back of the array
			*/
			current_node = btree.NODE_STORAGE[i][j];

			/* Get the X coordinate (i.e., left) by the horizontal spacing */
			left = btree.RECT_STORAGE_DIVIDER[i].horizontalSpacing * (j+1) - (RECT_WIDTH/2);
			/* Get the Y coordinate (i.e., top) by the vertical spacing */
		 	top = (btree.RECT_STORAGE_DIVIDER[i].bottom - (verticalSpacing/2));
		 	/* Standard width,height of a node, predeteremined */
			right = RECT_WIDTH;
			bottom = RECT_HEIGHT;

			/* Pick a random index to get a color for the node */
			// var randomColorIndex = Math.floor((Math.random() * 8) + 1);
			var randomColorIndex = ((j+i) % backgroundColors.length);
			if(randomColorIndex === 0){randomColorIndex++;}

			current_rect = new rectangleBoundary(left,right,top,bottom,0,0, backgroundColors[randomColorIndex], borderColors[randomColorIndex]);


			/* At this current height in the tree, the rectangle needs this rectangle that was created */
			btree.RECT_STORAGE_DIVIDER[i].nodes.push(current_rect);

			/* Making every node show their max array slots, (m) */

			/* Calculate the text spacing to draw the keys */
			textSpacing = RECT_WIDTH/(2*btree.t);
			/* Calculate the line spacing to seperate the keys in the array */
			lineSpacing = RECT_WIDTH/(2*btree.t-1);

			/* Set the text centers for the keys in the node */
			current_rect.calculateTextCenters(lineSpacing, 2*btree.t - 1);

			/* Go through all the keys in the node */
			for (var q = 0; q < btree.t * 2 - 1; q++) {

				/* If there are keys */
				if(q < current_node.length){
					/* Store all the keys in this node into the rectangle defining the node */
					current_rect.keys.push(current_node[q]);

					/* Draw the key */
					context.beginPath();
					context.fillStyle = "white";
					context.strokeStyle = borderColors[borderColors];
					context.lineWidth = 5;
					context.font = "17px Courier New";
					
					textWidth = context.measureText(current_node[q]).width;
					/* Random 1/3? */
					textHeight = 17/3;

					// This is for drawing an outline around the text
					context.strokeText(current_node[q], left+(textSpacing*(q+1)) - (textWidth) + (sumTextWidth/2), top + (RECT_HEIGHT/2) + textHeight);
						
					context.fillText(current_node[q],current_rect.textCenters[q] - textWidth/2, top + (RECT_HEIGHT/2) + textHeight);
					context.closePath();
				}

				/* 
					The check is to not draw an extra line between the keys at the end of the array 
					i.e. only lines between the keys in the array
				*/
				if(q + 1 < btree.t * 2 - 1){
					context.beginPath();
					/* Bar width for (m) elements in node */
					context.lineWidth = 5;			
					context.strokeStyle = borderColors[randomColorIndex];
					context.moveTo(left+(lineSpacing*(q+1)), top);
					context.lineTo(left+(lineSpacing*(q+1)), top+RECT_HEIGHT);
					context.stroke();
					context.closePath();
				}

			};
		};
	};	

	/* Takes all nodes and sets children */ 
	setAllChildren(btree);
	drawChildrenLines(btree);
	btree.treeBuilt = true;
}

/*
	This function takes a rectangle and finds all its children
		- it uses the search function on the btree to take a child rectangle to find its parent
		then checks the current parent with the found parent to see if the keys are the same
		This properly sets all rectangles to have the correct children
*/
function setAllChildren(btree){
	var current_rect;
	var current_child_rect;
	for (var i = 0; i < btree.RECT_STORAGE_DIVIDER.length; i++) {
		for (var j = 0; j < btree.RECT_STORAGE_DIVIDER[i].nodes.length; j++) {
			current_rect = btree.RECT_STORAGE_DIVIDER[i].nodes[j];
			if(i+1 < btree.height){
				for (var k = 0; k < btree.RECT_STORAGE_DIVIDER[i+1].nodes.length; k++) {
					key = btree.RECT_STORAGE_DIVIDER[i+1].nodes[k].keys;
					found = btree.root.search(key[0]);
					if(found){
						if(found.parent.keys[0] === current_rect.keys[0]){
							current_rect.C.push( btree.RECT_STORAGE_DIVIDER[i+1].nodes[k]);
						}
					}
				};
			}
		};
	};

}


function drawChildrenLines(btree){

	var current_rect;
	var current_child_rect;
	var key;
	var found;

	var lineSpacingX = 0;
	var lineSpacingY = 0;

	/* Height loop */
	for (var i = 0; i < btree.RECT_STORAGE_DIVIDER.length; i++) {
		/* All nodes at a given height */

		for (var j = 0; j < btree.RECT_STORAGE_DIVIDER[i].nodes.length; j++) {
			/* Get the current node/rect */
			current_rect = btree.RECT_STORAGE_DIVIDER[i].nodes[j];

			/* Line spacing for the line segements from parent to child 
				Length is the max number of nodes in a node 
			*/
			lineSpacingX = current_rect.right/(2*btree.t-1);

			/* Radius of the circles at the ends of child lines */
			/* 4? */
			var radius = 4;

			for (var k = 0; k < current_rect.C.length; k++) {
				current_child_rect = current_rect.C[k];
				key = current_rect.C[k].keys;

				lineSpacingY = current_child_rect.bottom;

				/* Draw line from parent to child node */
				context.beginPath();
				context.lineWidth = 2;

				/* Hard coded from FLAT UI color */
				context.strokeStyle = "#2c3e50";
				context.moveTo(current_rect.left + (lineSpacingX*k), current_rect.top + lineSpacingY);
				context.lineTo(current_child_rect.left + (lineSpacingX/2), current_child_rect.top);
				context.stroke();
				context.closePath();

				/* Circle outline behind */
				context.beginPath();
				context.fillStyle = "#2c3e50";
				context.arc(current_rect.left + (lineSpacingX*k),current_rect.top + lineSpacingY, radius+(radius/2), 0, 2*Math.PI);
				context.arc(current_child_rect.left + (lineSpacingX/2), current_child_rect.top, radius+(radius/2), 0, 2*Math.PI);
				context.closePath();
				context.fill();

				/* Draw circles at both ends of the line to make a segement */
				context.beginPath();
				context.fillStyle = "#bdc3c7";
				context.arc(current_rect.left + (lineSpacingX*k),current_rect.top + lineSpacingY, radius, 0, 2*Math.PI);
				context.arc(current_child_rect.left + (lineSpacingX/2), current_child_rect.top, radius, 0, 2*Math.PI);
				context.closePath();
				context.fill();			
			
			};

		};

	};    
}


function scaleTree(btree){
	
	/* 
		Clear the background of the canvas
		Everything has to be redrawn
	*/

	clearCanvas();

	/* Get the height of the btree tree */
	var treeHeight = btree.height;

	/* Pass these ones into functions from here */
	var SITE_WIDTH = window.innerWidth;
	var SITE_HEIGHT = window.innerHeight;
	/* The width of the node in respect to the SITE_WIDTH */
	var RECT_WIDTH_PERCENT = (box1.box_x - box1.x)/5;
	/* Every RECT's size is a percent of the SITE_WIDTH */
	var RECT_WIDTH = SITE_WIDTH * (RECT_WIDTH_PERCENT/100);
	/* RECT's height is a third of its width */
	var RECT_HEIGHT = RECT_WIDTH * (1/3);

	/* 
		verticalSpacing is for the dividing of the btree height
	*/
	var verticalSpacing = SITE_HEIGHT/treeHeight;

	/*
		---------------------------------
		DRAWS ALL THE NODES IN THE BTREE
		---------------------------------
	*/


	/*
		Spacing between each node when drawn 
	*/
	var horizontalSpacing = 0;


	/* Create the height boundaries of the tree */
	for (var i = 0; i < treeHeight; i++) {
		/* For the current height level, calculate the horizontal spacing */
		horizontalSpacing = SITE_WIDTH/(btree.RECT_STORAGE_DIVIDER[i].nodes.length+1);

		btree.RECT_STORAGE_DIVIDER[i].left = 0;
		btree.RECT_STORAGE_DIVIDER[i].right = SITE_WIDTH;
		btree.RECT_STORAGE_DIVIDER[i].bottom = verticalSpacing*(i+1);
		btree.RECT_STORAGE_DIVIDER[i].horizontalSpacing = horizontalSpacing;
		
	};

	/*
		Variables for they don't have to be declared insided for-loops
	*/
	var current_node;
	var current_rect;
	var left;
	var right;
	var top;
	var bottom;
	var textSpacing;
	var lineSpacing;
	var textWidth;
	var textHeight;
	var sumTextWidth;


	/* Draw the nodes */
	for (var i = 0; i < treeHeight; i++) {
		var rectangle_storage = btree.RECT_STORAGE_DIVIDER[i].nodes;

		for (var j = 0; j <rectangle_storage.length; j++) {
			/* Go through each node at the height 
				- Shift removes from back of the array
			*/
			current_rect = rectangle_storage[j];
			current_rect.draw();
			current_node = current_rect.keys;

			/* Get the X coordinate (i.e., left) by the horizontal spacing */
			left = btree.RECT_STORAGE_DIVIDER[i].horizontalSpacing * (j+1) - (RECT_WIDTH/2);
			/* Get the Y coordinate (i.e., top) by the vertical spacing */
		 	top = (btree.RECT_STORAGE_DIVIDER[i].bottom - (verticalSpacing/2));
		 	/* Standard width,height of a node, predeteremined */
			right = RECT_WIDTH;
			bottom = RECT_HEIGHT;

			current_rect.left = left;
			current_rect.right = right;
			current_rect.top = top;
			current_rect.bottom = bottom;	

			/* Calculate the text spacing to draw the keys */
			textSpacing = RECT_WIDTH/(2*btree.t);
			/* Calculate the line spacing to seperate the keys in the array */
			lineSpacing = RECT_WIDTH/(2*btree.t-1);

			/* Set the text centers for the keys in the node */
			current_rect.calculateTextCenters(lineSpacing, 2*btree.t - 1);

			/* Go through all the keys in the node */
			for (var q = 0; q < btree.t * 2 - 1; q++) {

				/* If there are keys */
				if(q < current_node.length){
					/* Store all the keys in this node into the rectangle defining the node */

					/* Draw the key */
					context.beginPath();
					context.fillStyle = "white";
					context.strokeStyle = current_rect.stroke_style;
					context.lineWidth = 5;
					context.font = "17px Courier New";
					
					textWidth = context.measureText(current_node[q]).width;
					/* Random 1/3? */
					textHeight = 17/3;

					context.fillText(current_node[q],current_rect.textCenters[q] - textWidth/2, top + (RECT_HEIGHT/2) + textHeight);
					context.closePath();
				}

				/* 
					The check is to not draw an extra line between the keys at the end of the array 
					i.e. only lines between the keys in the array
				*/
				if(q + 1 < btree.t * 2 - 1){
					context.beginPath();
					/* Bar width for (m) elements in node */
					context.lineWidth = 5;
					context.strokeStyle = current_rect.stroke_style;
					context.moveTo(left+(lineSpacing*(q+1)), top);
					context.lineTo(left+(lineSpacing*(q+1)), top+RECT_HEIGHT);
					context.stroke();
					context.closePath();
				}

			};	



		};
	};	

	drawChildrenLines(btree);

}

/* Clears the entire canvas and fills the canvas with a solid color*/
function clearCanvas(){
	/* Edit canvas name if your global variable is different */
	/* Sick of passing in the canvas into this function */
        context.rect(0,0,canvas.width, canvas.height);
        context.fillStyle = "#ecf0f1";
        context.fill();
}

/* 	
	Set the width and height of the canvas
	Uses the window height and width 
*/
function setCanvasDimensions(){
        /* Set the canvas size */
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
}




