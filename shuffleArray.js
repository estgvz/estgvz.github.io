function shuffleArray(arr) {
	var len = arr.length;
	var arr2 = arr.splice(0);
	for(var i=0;i<len;i++) {
		arr.push(arr2.splice(Math.floor(Math.random()*arr2.length),1)[0]);
	}
	return 0;
}