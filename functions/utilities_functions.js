function findShortestStringInArr(){
	var min = Math.min.apply(Math, arr.map(function(str) { return str.length; }));
	for (i = 0; i < arr.length; i++){
		if (arr[i].length == min)
			return arr[i];
	}	
}
