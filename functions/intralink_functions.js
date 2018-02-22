function removeElement(arr, search_term)
{	
	if (/^\d\d?$/.test(search_term)){
		arr.splice(search_term-1, 1);
		return true;
	} else {
		var str;
		for (index1 in arr){
			for (index2 in arr[index1]){
				pattern = new RegExp(search_term, "gi"); 
				if (pattern.test(arr[index1][index2])){	
					arr.splice(index1, 1);
					return true;
				}
			}
		}
		return false;		
	}

}
