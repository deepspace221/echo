
function getUserOBJ(user){
	var regexp = new RegExp(user, 'i');
	for (key in ServerMembers){
	     if (ServerMembers[key].User.ID == userID || /regexp/.test(ServerMembers[key].User.Username)){
		     var obj = {};
		     obj.userImage = "https://discordapp.com/api/v6/users/" + userID + "/avatars/" + ServerMembers[key].User.Avatar + ".jpg";
		     
		     for (element in ServerMembers[key]){
			obj[element] = ServerMembers[key].element;     
		     }   	 
		     return obj;
	     }	
	}
        return false;
}
