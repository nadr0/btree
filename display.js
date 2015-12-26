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
	var constant;

	var backgroundColors = ["","#1abc9c","#2ecc71","#3498db","#9b59b6","#f1c40f","#e67e22","#e74c3c","#95a5a6"];
	var borderColors = ["","#16a085","#27ae60","#2980b9","#8e44ad","#f39c12","#d35400","#c0392b","#7f8c8d"];

	/* Draw the nodes */
	for (var i = 0; i < treeHeight; i++) {

		var STATIC_LENGTH = btree.NODE_STORAGE[i].length;

		for (var j = 0; j < STATIC_LENGTH; j++) {
			current_node = btree.NODE_STORAGE[i].shift();


			left = btree.RECT_STORAGE_DIVIDER[i].horizontalSpacing * (j+1) - (RECT_WIDTH/2);
		 	top = (btree.RECT_STORAGE_DIVIDER[i].bottom - (verticalSpacing/2));
			right = RECT_WIDTH;
			bottom = RECT_HEIGHT;

			var randomColorIndex = Math.floor((Math.random() * 8) + 1);

			current_rect = new rectangleBoundary(left,right,top,bottom,0,0, backgroundColors[randomColorIndex], borderColors[randomColorIndex]);
			btree.RECT_STORAGE_DIVIDER[i].nodes.push(current_rect);

			textSpacing = RECT_WIDTH/(2*btree.t);
			lineSpacing = RECT_WIDTH/(2*btree.t-1);
			
			constant = 0;

			for (var q = 0; q < btree.t * 2 - 1; q++) {
				if(q < current_node.length){
					current_rect.keys.push(current_node[q]);

					context.beginPath();
					context.fillStyle = "white";
					context.strokeStyle = borderColors[borderColors];
					context.lineWidth = 5;
					// context.font = "17px Sans-serif";
					context.font = "17px Verdana";
					
					textWidth = context.measureText(current_node[q]).width;

					/* Random 1/3? */
					textHeight = 17/3;

					/* subtract the width of text */
					// context.strokeText(current_node[q], left+(textSpacing*(q+1)) - (textWidth) + (constant/2), top + (RECT_HEIGHT/2) + textHeight);
						
					context.fillText(current_node[q], left+(textSpacing*(q+1)) - (textWidth) + (constant/2), top + (RECT_HEIGHT/2) + textHeight);
					context.closePath();
					constant += 21;

				}

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
}


function setAllChildren(btree){
	var current_rect;
	for (var i = 0; i < btree.RECT_STORAGE_DIVIDER.length; i++) {
		for (var j = 0; j < btree.RECT_STORAGE_DIVIDER[i].nodes.length; j++) {
			current_rect = btree.RECT_STORAGE_DIVIDER[i].nodes[j];
			if(i+1 < btree.height){
				for (var k = 0; k < btree.RECT_STORAGE_DIVIDER[i+1].nodes.length; k++) {
					current_rect.C.push( btree.RECT_STORAGE_DIVIDER[i+1].nodes[k]);
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

	var numChildren = 0;
	var childrenStored = [];

	for (var i = 0; i < btree.RECT_STORAGE_DIVIDER.length; i++) {
		for (var j = 0; j < btree.RECT_STORAGE_DIVIDER[i].nodes.length; j++) {
			current_rect = btree.RECT_STORAGE_DIVIDER[i].nodes[j];

			numChildren = 0;
			childrenStored = [];

			for (var k = 0; k < current_rect.C.length; k++) {
				current_child_rect = current_rect.C[k];
				key = current_rect.C[k].keys;
				found = btree.root.search(key[0]);
				if(found){
					if(found.parent.keys[0] === current_rect.keys[0]){
						numChildren++;
						childrenStored.push(current_child_rect);
					}
				}
			};

			lineSpacingX = current_child_rect.right/(2*btree.t-1);

			var w = 0;
			/* Radius of the circles at the ends of child lines */
			var radius = 4;

			for (var k = 0; k < current_rect.C.length; k++) {
				current_child_rect = current_rect.C[k];
				key = current_rect.C[k].keys;

				lineSpacingY = current_child_rect.bottom;

				found = btree.root.search(key[0]);
				if(found){
					if(found.parent.keys[0] === current_rect.keys[0]){
						/* Draw line from parent to child node */

						context.beginPath();
						context.lineWidth = 2;
						context.strokeStyle = "#2c3e50";
						context.moveTo(current_rect.left + (lineSpacingX*w), current_rect.top + lineSpacingY);
						context.lineTo(current_child_rect.left + (lineSpacingX/2), current_child_rect.top);
						context.stroke();
						context.closePath();


						context.beginPath();
						context.fillStyle = "#2c3e50";
						context.arc(current_rect.left + (lineSpacingX*w),current_rect.top + lineSpacingY, radius, 0, 2*Math.PI);
						context.arc(current_child_rect.left + (lineSpacingX/2), current_child_rect.top, radius, 0, 2*Math.PI);
						context.closePath();
						context.fill();

						w++;
					}
				}
			};

		};
	};    
}







