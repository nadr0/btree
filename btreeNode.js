/*
	CS 225 APPLET B-TREE 
*/

function B_TREE_NODE(){
	/* An array of keys */
	this.keys = [];
	/* Current number of keys */
	this.numberOfKeys = 0;
	/* Am I a leaf */
	this.leaf = 0;

	/* Max keys */
	this.order = 0;
}


/*
	Constructor
*/
B_TREE_NODE.prototype.init = function(){

}


/*
	Insert
		Inserts the value into the keys array, in order

	Call .sort(function(a,b){return a-b}); for now on keys
*/
B_TREE_NODE.prototype.insert = function(value){
	/* Insert value into the array */
	this.keys.push(value);
	/* Sort the keys */
	this.keys.sort(function(a,b){return a-b});

	/* Increment the number of keys */
	this.numberOfKeys++;
}