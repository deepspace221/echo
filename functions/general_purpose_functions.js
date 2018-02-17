
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
function findUserImageAndUsernameByUserID(userID){
	for (key in ServerMembers){
	     if (ServerMembers[key].User.ID == userID){
		     var userIcon = "https://discordapp.com/api/v6/users/" + userID + "/avatars/" + ServerMembers[key].User.Avatar + ".jpg";
		     var userName = ServerMembers[key].User.Username;
		     var obj = {username: userName, avatar: userIcon};
		     return obj;
	     }	
	}
        return false;
}

function getUserOBJ(user){
	var regexp = new RegExp(user, 'i');
	for (key in ServerMembers){
	     if (ServerMembers[key].User.ID == user || regexp.test(ServerMembers[key].User.Username)){
		     var obj = {};   
          	     obj = JSON.parse(JSON.stringify(ServerMembers[key]));
                     obj.userImage = "https://discordapp.com/api/v6/users/" + ServerMembers[key].User.ID + "/avatars/" + ServerMembers[key].User.Avatar + ".jpg";
		     return obj;
	     }	
	}
        return false;
}
function getNumSupported(){
        var ctr = 0;
        bottomRole = getRolePosition("Yiddish");
        topRole = getRolePosition("Afrikaans");     
        for (i=0; i < ServerRoles.length; i++)
                if (ServerRoles[i].Position >= bottomRole && ServerRoles[i].Position <= topRole)
                    ctr++;   
        return ctr;
}
function getRendom(num){
          return Math.floor((Math.random() * num) + 0);
}
