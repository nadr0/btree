/*
	CS 225 APPLET B-TREE 
*/

function B_TREE_NODE(m,leaf){
	/* An array of keys */
	this.keys = [];
	
	/* Current number of keys */
	this.numberOfKeys = 0;

	/* Am I a leaf */
	this.leaf = leaf;

	/* Determines max keys */
	this.m = m;

	/* Child nodes */
	this.children = [];
}