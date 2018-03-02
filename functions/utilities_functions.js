function findShortestStringInArr(arr){
	var min = Math.min.apply(Math, arr.map(function(str) { return str.length; }));
	for (i = 0; i < arr.length; i++){
		if (arr[i].length == min)
			return arr[i];
	}	
}

function escapeRegExp(str) { 
  str = str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  return str;
}

function getArrRoleIDtoRoleName(arr){
	var output = [];
	for (var i = 0; i < arr.length; i++){
		output.push(GetRoleName(arr[i]));
	}
	dbg(output);
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

function sortABC(a, b, property){
	if (property){
		if (a[property] > b[property]) return 1;
		if (a[property] < b[property]) return -1;
		if (a[property] == b[property]) return 0;   
	}else {
		if (a > b) return 1;
		if (a < b) return -1;
		if (a == b) return 0;   	
	}
}

function isValueInArr(arr, value){
	for (var j = 0; j < arr.length; j++){
		if (arr[j].indexOf(value) != -1)
			return true;
	}
	return false;
}

function firstCharToUpperCase(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeFirst3charsFromArr(arr){
      for (var i = 0; i < arr.length; i++){
            arr[i] = arr[i].slice(3);     
      }
      return arr;
}

function insertArrValueStartValueEnd(arr, valueStart, valueEnd){
      if (!valueStart) valueStart = "";
      if (!valueEnd) valueEnd = ""; 
      for (var i = 0; i < arr.length; i++){
            arr[i] = valueStart + arr[i] + valueEnd;     
      }
      return arr;
}

function createEmptyStr(len){
      var str = "";
      for (var i = 0; i < len; i++){
            str += " ";
      }
      return str;
}

function getUserRoleKeyName(str){
        return str.replace(/[\s.\-•\+]/g, "");
}
