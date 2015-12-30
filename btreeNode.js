/*
	CS 225 APPLET B-TREE 


	B_TREE_NODE
*/

function B_TREE_NODE(t,leaf){

	/* An array of keys */
	this.keys = [];

	/* Current number of keys */
	this.numkeys = 0;

	/* Am I a leaf */
	this.leaf = leaf;

	/* Max keys */
	this.t = t;

	/* Children */
	this.C = [];

	/* Height 
		- Default height 1 instead of zero indexed
	*/
	this.height = 1;

	/* Parent node */
	this.parent = null;

}


B_TREE_NODE.prototype.insertNonFull = function(k){

	/* Get the right most index */
	var i = this.numkeys - 1;


	/* Check for leaf node */
	if(this.leaf === true){


		while(i >= 0 && this.keys[i] > k){
			this.keys[i+1] = this.keys[i];
			i--;
		}

		/* Insert the key at the found location */
		this.keys[i+1] = k;
		/* increment the number of keys its storing */
		this.numkeys++;

	}else{/*This node is not a leaf */

		while(i >= 0 && this.keys[i] > k){
			i--;
		}

		/* If the child is full then split */
		if(this.C[i+1].numkeys === 2*this.t - 1){

			this.splitChild(i+1, this.C[i+1]);

			if(this.keys[i+1] < k){
				i++;
			}

		}
		this.C[i+1].insertNonFull(k);
	}

}



B_TREE_NODE.prototype.splitChild = function(i, y){

	var z = new B_TREE_NODE(y.t, y.leaf);
	z.numkeys = this.t - 1;

	for(var j = 0; j < this.t - 1; j++){
		z.keys[j] = y.keys[j+this.t];

	}
	for (var j = z.keys.length; j > 0; j--) {
		y.keys.pop();
	};


	if(y.leaf === false){
		for(var j = 0; j < this.t; j++){
			z.C[j] = y.C[j+this.t];
		}
		
		for(var j = y.C.length-1; j >= this.t; j--){
			y.C.splice(j,1);
		}

	}

	/* Decrease the number of keys */
	y.numkeys = this.t - 1;

	for(var j = this.numkeys; j >= i + 1; j--){
		this.C[j+1] = this.C[j];
	}

	this.C[i+1] = z;

	for(var j = this.numkeys - 1; j >= i; j--){
		this.keys[j+1] = this.keys[j];
	}

	this.keys[i] = y.keys[this.t-1];
	y.keys.splice(this.t-1,1);

	this.numkeys = this.numkeys + 1;
}

/* 
	Traverse the b-tree 
		- Main use to set the parents 
*/

B_TREE_NODE.prototype.traverse = function(parent,btree){
	var i;
	var currentParent = parent;
	for (i = 0; i < this.C.length; i++)
	{
		/* Sets the parents to currently update them when traversing the structure */
		this.C[i].parent = currentParent;
		this.C[i].height = currentParent.height + 1;

		/* Push into arrays */
		btree.NODE_STORAGE[this.C[i].height-1].push(this.C[i].keys);

		if (this.leaf === false)
			this.C[i].traverse(this.C[i],btree);
	}
}


B_TREE_NODE.prototype.search = function(k){

	var i = 0;
	while( i < this.numkeys && k > this.keys[i]){
		i++;
	}

	if(this.keys[i] === k){
		return this;
	}

	if(this.leaf === true){
		return null;
	}

	return this.C[i].search(k);
}



