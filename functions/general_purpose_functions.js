//GIVINIG ROLES. Sort the users roles and return them as an array;
function sortRolesByPosition() {
        var arr = new Array();
        for (var i = 0; i < UserRoles.length; i++) {
            for (var j = 0; j < ServerRoles.length; j++) {
                if (UserRoles[i] === ServerRoles[j]["ID"]) {
                    var role = {
                        Position: ServerRoles[j]["Position"],
                        Name: GetRoleName(UserRoles[i])
                    };
                    arr.push(role);
                }
            }
        }
        var byPos = arr.slice(0);
        byPos.sort(function(a,b) {
            return b.Position - a.Position;
        });
        return byPos;
}

//GIVINIG ROLES. Returns an array of restricted roles
function getRestrictedRoles(){
	var arr = [];
	for (i=0; i < ServerRoles.length; i++){
   		 if (/^[^\d]\s/.test(ServerRoles[i]["Name"]))
     			 arr.push(ServerRoles[i]["Name"]);
	}
	return arr;
}

//Count. Returns a role position.
function getRolePosition(roleName){
        for (i=0; i < ServerRoles.length; i++){
            if (ServerRoles[i].Name == roleName)
                return ServerRoles[i].Position;
        }
}
//Count|Roles get staff role name. You can also use the function GetRoleName(337966506191224834)
function getStaffRoleName(){ //working
        for (i=0; i < ServerRoles.length; i++){
            if (ServerRoles[i].ID == 337966506191224834)
                return ServerRoles[i].Name;
        }
}
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
function getRegexRoleName(roleName){
	var regex = new RegExp(roleName, 'i')
	var ctr = 0;
	for (i = 0; ServerRoles.length; i++){
		if (/regex/i.test(ServerRoles["Name"])){
			ctr++;
			roleName = ServerRoles["Name"];	
		}	
	}
	if (ctr > 1)
		return;
	else return roleName;
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

