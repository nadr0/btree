/* 
	CS 225 APPLET B-TREE 
	
	B-Tree object
		- Keys are stored in the nodes
	
	Methods:
		- Search
		- Insertion
		- Deletion

*/


/* 
	B-TREE 
	Args:
		m-ary
*/
function B_TREE(t){
	// M-ary tree
	this.t = t;
	// Root node
	this.root = null;


	// Keep track of the height
	this.height = 0;


	// Storage for displaying
	this.NODE_STORAGE = null;

	this.RECT_STORAGE_DIVIDER = null;

}

/* 
	Populate the NODE_STORAGE for display
*/
B_TREE.prototype.setupForDisplay = function(){

	/* Create slots for each height */
	this.NODE_STORAGE = new Array(this.height);
	this.RECT_STORAGE_DIVIDER = new Array(this.height);

	for (var i = 0; i < this.height; i++) {
		/* 	Size of 1 just for some space 
			Array.push will auto increase the size
		*/
		this.NODE_STORAGE[i] = [];
	};

}

/*
	Insertion
	Args:
		value: the number to be inserted
*/
B_TREE.prototype.insert = function(k){

	if(this.root === null){
		/* The rot is initially a leaf */
		this.root = new B_TREE_NODE(this.t, true);
		/* Insert the key */
		this.root.keys[0] = k;
		this.root.numkeys = 1;
		this.height = 1;
		this.parent = null;
	}else{
		/* The tree is not empty */

		/* If the root is full, grow the tree up */
		if(this.root.numkeys === 2 * this.t - 1){
			var newNode = new B_TREE_NODE(this.t, false);
			newNode.parent = null;
			newNode.height = 1;

			/* Have the new root have the current root its child */
			newNode.C[0] = this.root;

			newNode.splitChild(0, this.root);

			/* Determine what child is going to have this new key */
			var i = 0;
			if(newNode.keys[0] < k){
				i++;
			}
			
			newNode.C[i].insertNonFull(k);

			/* Increase height */
			for (var i = 0; i < newNode.C.length; i++) {
				newNode.C[i].height++;
			};

			/* Set the new root */
			this.root = newNode;

			/* Increase the height of the tree */
			this.height++;

		}else{
			/* If the root is not full */
			this.root.insertNonFull(k);
		}


	}
}

/*
	Deletion
*/
B_TREE.prototype.delete = function(){

}

/*
	Update
		- Call this to update the HTML display
*/
B_TREE.prototype.update = function(){

}




