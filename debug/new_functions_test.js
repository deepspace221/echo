function findUserImageAndUsernameByUserID(userID){
	for (key in ServerMembers){
	     if (ServerMembers[key].User.ID == userID){
		     var userIcon = "https://discordapp.com/api/v6/users/" + userID + "/avatars/" + ServerMembers[key].User.Avatar + ".jpg";
		     var userName = ServerMembers[key].User.Name;
		     var obj = {username: userName, avatar: userIcon};
		     retrun obj;
	     }	
	}
}
