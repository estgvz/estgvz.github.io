function shuffleArray(arr) {
	var len = arr.length;
	var arr2 = arr.splice(0);
	for(var i=0;i<len;i++) {
		arr.push(arr2.splice(Math.floor(Math.random()*arr2.length),1)[0]);
	}
	return 0;
}

function removeDuplicates(arr) {
	var arr2 = arr.splice(0);
	for(var i=0;i<arr2.length;i++) {
		if(arr.indexOf(arr2[i]) == -1) {
			arr.push(arr2[i]);
		}
	}
	return 0;
}