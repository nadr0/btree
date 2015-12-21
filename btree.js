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

	}else{
		/* The tree is not empty */



		/* If the root is full, grow the tree up */
		if(this.root.numkeys === 2 * this.t - 1){

			var newNode = new B_TREE_NODE(this.t, false);

			/* Have the new root have the current root its child */
			newNode.C[0] = this.root;

			newNode.splitChild(0, this.root);

			/* Determine what child is going to have this new key */
			var i = 0;
			if(newNode.keys[0] < k){
				i++;
			}
			
			newNode.C[i].insertNonFull(k);

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