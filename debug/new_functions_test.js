function getMembersCount(){
	var ctr = 0;
	for (key in ServerMembers){
		if (!ServerMembers[key].Bot)
			ctr++;
	}	
	return ctr;
}
