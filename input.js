function insertToBtree(div,btree){
	console.log(div.value);

	var stringInt = div.value;
	var value = parseInt(stringInt,10);

        context.rect(0,0,canvas.width, canvas.height);
        context.fillStyle = "#ecf0f1";
        context.fill();

	btree.insert(value);
        btree.setupForDisplay();
	btree.NODE_STORAGE[0].push(btree.root.keys);
        btree.root.traverse(btree.root,btree);
        setupBoundaries(btree);

	/* Clear the value in the input field */
	div.value = "";
}

function keyBoardInit(event,btree){
	document.body.addEventListener("keypress", function(event){
		if(event.keyCode === 13 ){
			if(document.activeElement.id === "Insert"){
				insertToBtree(document.activeElement,btree);
			}
		}
	},false);
}