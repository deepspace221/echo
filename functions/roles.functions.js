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
