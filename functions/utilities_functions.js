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

function getArrRoleIDtoRoleName(arr){
	var output = [];
	for (var i = 0; i < arr.length; i++)
		output.push(GetRoleName(arr[i]));
	return output;				
}

function createArrOutputCommaSeprated(arr){
	var output = "";
	for (var i = 0; i < arr.length; i++){
		if (i == (arr.length - 1)){
			output += arr[i];
			break;
		}		
	       output += arr[i] + ", ";
	}
	return output;
}
function createArrOutputNewLinesSeprated(arr){
	var output = "";
	for (var i = 0; i < arr.length; i++){
		if (i == (arr.length - 1)){
			output += arr[i];
			break;
		}		
	       output += arr[i] + "\n";
	}
	return output;
}


function isValueInArr(arr, role){
	for (var j = 0; j < arr.length; j++){
		if (arr[j].indexOf(role) == -1)
			return true;
	}
	return false;
}
