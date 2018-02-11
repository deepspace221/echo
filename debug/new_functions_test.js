function getMembersCount(type){
	var ctr = 0;
	if (!type){
		for (key in ServerMembers){
			ctr++;
		}
	}	
	else if (type == "users"){
		for (key in ServerMembers){
			if (!ServerMembers[key].User.Bot)
				ctr++;
		}
	}
	else if (type == "bots"){
		for (key in ServerMembers){
			if (ServerMembers[key].User.Bot)
				ctr++;
		}
	}
	return ctr;
}
