function findShortestStringInArr(arr){
	var min = Math.min.apply(Math, arr.map(function(str) { return str.length; }));
	for (i = 0; i < arr.length; i++){
		if (arr[i].length == min)
			return arr[i];
	}	
}

// function escapeRegExp(str) { 
//   str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
//   dbg(str);
//   return str;
// }

function escapeRegExp(str) {
// 	var arr = ["\\-","\\[","\\]","\\/","\\{","\\}","\\(","\\)","\\*","\\+","\\?","\\.","\\\\","\\^","\\$","\\|"];
// // 	var arr = ["\-","\[","\]","\/","\{","\}","\(","\)","\*","\+","\?","\.","\\","\^","\$","\|"];
// 	for (var i = 0; i < arr.length; i++){
// 		var regExp = new RegExp(arr[i], "g")
// 		str.replace(regExp, arr[i]);
// 	}
// 	dbg(str);
	return str;
}

