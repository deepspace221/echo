
function getUserOBJ(user){
	var regexp = new RegExp(user, 'i');
	for (key in ServerMembers){
	     if (ServerMembers[key].User.ID == user || /regexp/i.test(ServerMembers[key].User.Username)){
		     var obj = {};
// 		     obj.userImage = "https://discordapp.com/api/v6/users/" + ServerMembers[key].User.ID + "/avatars/" + ServerMembers[key].User.Avatar + ".jpg";
		     
// 		     for (element in ServerMembers[key]){
// 			obj[element] = ServerMembers[key].element;     
// 		     } 
// 		     ServerMembers[key].Roles.push("361115107323019264");
		     
		     obj = ServerMembers[key];
		     return obj;
	     }	
	}
        return false;
}
