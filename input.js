function insertToBtree(div,btree, type){
	var stringInt;
	var value;
	/* Type 0 is for pressing enter
	   Anything else is button pressing
	*/
	if(type === 0){
		stringInt = div.value;
		value = parseInt(stringInt,10);
		div.value = "";
	}else{
		var insertField = document.getElementById("Insert");
		stringInt = insertField.value;
		value = parseInt(stringInt,10);
		insertField.value = "";
	}

	clearCanvas();

	btree.insert(value);
        btree.setupForDisplay();
	btree.NODE_STORAGE[0].push(btree.root.keys);
        btree.root.traverse(btree.root,btree);
        setupBoundaries(btree);

	/* Clear the value in the input field */
	
}

function keyBoardInit(event,btree){
	document.body.addEventListener("keypress", function(event){
		if(event.keyCode === 13 ){
			if(document.activeElement.id === "Insert"){
				insertToBtree(document.activeElement,btree,0);
			}
		}
	},false);
}