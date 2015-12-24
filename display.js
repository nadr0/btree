
function display_B_TREE(btree){
	/* Get the width of the browser */
	var SITE_WIDTH = window.innerWidth;
	/* Get the height of the browser */
	var SITE_HEIGHT = window.innerHeight;

	/* The width of the nodes in respect to the SITE_WIDTH */
	var RECT_WIDTH_PERCENT = 5;

	/* Every RECT's size is a percent of the SITE_WIDTH */
	var RECT_WIDTH = SITE_WIDTH * (RECT_WIDTH_PERCENT/100);
	/* RECT's height is a third of its width */
	var RECT_HEIGHT = RECT_WIDTH * (1/3);

	/* Starting root node x location */
	var RECT_X = SITE_WIDTH/2 - RECT_WIDTH/2;

	var RECT_Y = RECT_HEIGHT;

	/* Draw the root */

	/* Fixes drawing issues */
	context.lineWidth = 2;

	/* Draw the node*/
	context.beginPath();
	context.rect(RECT_X, RECT_Y, RECT_WIDTH, RECT_HEIGHT);
	context.closePath();
	context.stroke();

}

/* 
	Determines the boundary rectangles for the btree nodes
*/
function setupBoundaries(btree){
	var treeHeight = btree.height;

	/* Pass these ones into functions from here */
	var SITE_WIDTH = window.innerWidth;
	var SITE_HEIGHT = window.innerHeight;

	/* The width of the node in respect to the SITE_WIDTH */
	var RECT_WIDTH_PERCENT = 10;

	/* Every RECT's size is a percent of the SITE_WIDTH */
	var RECT_WIDTH = SITE_WIDTH * (RECT_WIDTH_PERCENT/100);
	/* RECT's height is a third of its width */
	var RECT_HEIGHT = RECT_WIDTH * (1/3);

	/* Starting root node x location */
	var RECT_X = SITE_WIDTH/2 - RECT_WIDTH/2;

	var RECT_Y = RECT_HEIGHT;

	var verticalSpacing = SITE_HEIGHT/treeHeight;
	var horizontalSpacing = 0;

	/* Create the height boundaries of the tree */
	for (var i = 0; i < treeHeight; i++) {
		horizontalSpacing = SITE_WIDTH/(btree.NODE_STORAGE[i].length+1);
		btree.RECT_STORAGE_DIVIDER[i] =  new rectangleBoundary(0,SITE_WIDTH,0,verticalSpacing*(i+1),horizontalSpacing,1);
	};

	/* Current node to be processed */
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

	/* Draw the nodes */
	for (var i = 0; i < treeHeight; i++) {

		var STATIC_LENGTH = btree.NODE_STORAGE[i].length;

		for (var j = 0; j < STATIC_LENGTH; j++) {
			current_node = btree.NODE_STORAGE[i].shift();


			left = btree.RECT_STORAGE_DIVIDER[i].horizontalSpacing * (j+1) - (RECT_WIDTH/2);
		 	top = (btree.RECT_STORAGE_DIVIDER[i].bottom - (verticalSpacing/2));
			right = RECT_WIDTH;
			bottom = RECT_HEIGHT;

			current_rect = new rectangleBoundary(left,right,top,bottom,0,0);
			btree.RECT_STORAGE_DIVIDER[i].nodes.push(current_rect);

			textSpacing = RECT_WIDTH/(current_node.length+1);
			lineSpacing = RECT_WIDTH/(current_node.length);

			for (var q = 0; q < current_node.length; q++) {
				context.beginPath();
				context.fillStyle = "black";
				context.strokeStyle = "white";
				context.lineWidth = 2;
				context.font = "17px Sans-serif";
				
				textWidth = context.measureText(current_node[q]).width;
				
				/* Random 1/3? */
				textHeight = 17/3;

				/* subtract the width of text */
				context.strokeText(current_node[q], left+(textSpacing*(q+1)) - (textWidth/2), top + (RECT_HEIGHT/2) + textHeight);
				context.fillText(current_node[q], left+(textSpacing*(q+1)) - (textWidth/2), top + (RECT_HEIGHT/2) + textHeight);
				context.closePath();

				if(q + 1 < current_node.length){
					context.beginPath();
					context.strokeStyle = "black";
					context.moveTo(left+(lineSpacing*(q+1)), top);
					context.lineTo(left+(lineSpacing*(q+1)), top+RECT_HEIGHT);
					context.stroke();
					context.closePath();
				}

			};
		};
	};	
}

