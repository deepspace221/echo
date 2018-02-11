function getMembersCount(){
	var ctr = 0;
	for (i = 0; ServerMembers.length; i++){
		if (!ServerMembers[i].User.Bot)
			ctr++;
	}	
	return ctr;
}
