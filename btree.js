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
function B_TREE(m){
	// M-ary tree
	this.m = m;
	// Root node
	this.root = null;
}


/*
	B-TREE constructor
*/ 
B_TREE.prototype.init = function(){

}

/* 
	Search
*/
B_TREE.prototype.search = function(){

}


/* 
	Insertion
	Args:
		value: the number to be inserted
*/
B_TREE.prototype.insert = function(value){

	if(this.root === null){
		this.root = new B_TREE_NODE();
		this.root.insert(value);
		this.root.order = this.m;
	}

}

/*
	Deletion
*/
B_TREE.prototype.delete = function(){

}