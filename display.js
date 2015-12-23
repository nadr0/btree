
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
	var verticalSpacing = btree.height;

	/* Pass these ones into functions from here */
	var SITE_WIDTH = window.innerWidth;
	var SITE_HEIGHT = window.innerHeight;

	/* The width of the node in respect to the SITE_WIDTH */
	var RECT_WIDTH_PERCENT = 5;

	/* Every RECT's size is a percent of the SITE_WIDTH */
	var RECT_WIDTH = SITE_WIDTH * (RECT_WIDTH_PERCENT/100);
	/* RECT's height is a third of its width */
	var RECT_HEIGHT = RECT_WIDTH * (1/3);

	/* Starting root node x location */
	var RECT_X = SITE_WIDTH/2 - RECT_WIDTH/2;

	var RECT_Y = RECT_HEIGHT;

	

}


/*
	Draws the B_TREE_NODE
	- Children
	- Displays Keys
*/
function display_B_TREE_NODE(node, RECT_X, RECT_Y,SITE_WIDTH, SITE_HEIGHT, RECT_WIDTH, RECT_HEIGHT){

	if(node === null){
		return;
	}
	/* Get the number of keys in the node */
	var NUM_KEYS = node.numkeys;

	if(NUM_KEYS === 0){
		return;
	}

	/* Spacing between each key */
	var KEY_SPACING = RECT_WIDTH/NUM_KEYS;

	/* Get the number of children */
	var NUM_CHILDREN = node.C.length;

	/* Location for the first line to seperate the keys */
	var loc = KEY_SPACING + RECT_X;

    /* Fixes drawing issues */
    context.lineWidth = 2;
    
    /* Draw the node*/
    context.beginPath();
    context.rect(RECT_X, RECT_Y, RECT_WIDTH, RECT_HEIGHT);
    context.closePath();
    context.stroke();

    /* Draw the lines to seperate each key */
	for(var i = 0; i < NUM_KEYS - 1; i++){
		context.beginPath();
		context.moveTo(loc, RECT_Y);
		context.lineTo(loc, RECT_Y + RECT_HEIGHT);
		context.closePath();
		context.stroke();
		loc += KEY_SPACING;
	}

	/* Draw the keys */
	var text_loc = KEY_SPACING/2 + RECT_X;
	for(var i = 0; i < NUM_KEYS; i++){
		context.fillText(node.keys[i],text_loc, RECT_Y + RECT_HEIGHT/2);
		text_loc += KEY_SPACING
	}

	if(NUM_CHILDREN === 0){
		return;
	}

	/* Child line spacing */
	var CHILD_SPACING = RECT_WIDTH/(NUM_CHILDREN-1);


	var CHILD_SPACING_NODE = SITE_WIDTH/(NUM_CHILDREN+1); 

	var child_loc = RECT_X;
	var child_loc_end = CHILD_SPACING_NODE; 

	var node_locations_x = [];
	var node_locations_y = [];

	/* Draw child node lines */
	for(var i = 0; i < NUM_CHILDREN; i++){
		context.beginPath();
		context.moveTo(child_loc, RECT_Y*2);
		context.lineTo(child_loc_end, RECT_Y*3);
		context.closePath();
		context.stroke();

		node_locations_x.push(child_loc_end - RECT_WIDTH/2);
		node_locations_y.push(RECT_Y*3);

		child_loc += CHILD_SPACING;
		child_loc_end += CHILD_SPACING_NODE;	
	}

 	for (var i = 0; i < NUM_CHILDREN; i++) {
 		display_B_TREE_NODE(node.C[i], node_locations_x[i], node_locations_y[i],SITE_WIDTH, SITE_HEIGHT, RECT_WIDTH, RECT_HEIGHT)
 	};

}