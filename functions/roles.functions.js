function getArrSortedRolesByPosition() {
        var arr = new Array();
        for (var i = 0; i < UserRoles.length; i++) {
            for (var j = 0; j < ServerRoles.length; j++) {
                if (UserRoles[i] === ServerRoles[j]["ID"]) {
                    var role = {
                        position: ServerRoles[j]["Position"],
                        name: GetRoleName(UserRoles[i])
                    };
                    arr.push(role);
                }
            }
        }
        var byPos = arr.slice(0);
        byPos.sort(function(a,b) {
            return b.position - a.position;
        });
        return byPos;
}

//GIVINIG ROLES. Returns an array of restricted roles
function getRestrictedRoles(){
	var arr = [];
	for (var i = 0; i < ServerRoles.length; i++){
   		 if (/^[^\d]\s/.test(ServerRoles[i]["Name"]))
     			 arr.push(ServerRoles[i]["Name"]);
	}
	return arr;
}

//Count. Returns a role position.
function getRolePosition(roleName){
        for (var i = 0; i < ServerRoles.length; i++){
            if (ServerRoles[i].Name == roleName)
                return ServerRoles[i].Position;
        }
}
//Count|Roles get staff role name. You can also use the function GetRoleName(337966506191224834)
function getStaffRoleName(){ //working
        for (var i = 0; i < ServerRoles.length; i++){
            if (ServerRoles[i].ID == 337966506191224834)
                return ServerRoles[i].Name;
        }
}
function getRegexRoleName(roleName){
	var regex = new RegExp(roleName, 'i');
	var ctr = 0;
	for (var i = 0; ServerRoles.length; i++){
		if (/regex/i.test(ServerRoles["Name"])){
			ctr++;
			roleName = ServerRoles["Name"];	
		}	
	}
	if (ctr > 1)
		return;
	else return roleName;
}

function getUniqueRole(role, roles){
	var roleRGX = new RegExp(escapeRegExp(str));
	var arr = [];

	for (var k = 0; k < ServerRoles.length; k++){
		if (roleRGX.test(ServerRoles[k]["Name"])) {
			arr.push(ServerRoles[k]["Name"]);
		}
	}

	dbg(arr);
	if (arr.length > 4){
		roles.errMsg.push("\nRole `" + role + "` isn't unique enough. Too many results. Quitting.");
		return false;
	}
	else if (arr.length == 4 || arr.length == 3 || arr.length == 2){
		return findShortestStringInArr(arr);
	}
	else if (arr.length == 1){
		return arr[0];
	}
	return false;
}

function isRoleRestrictedForStaff(role, roles, regexRestrictedRoles, staffRestrictedRoles){
	if (isRoleHigherThanUserTopRole(role)){
		roles.errMsg.push("{user} Staff, the role `" + role + "` is above your clearance level!");
		return true;
	}
	else {
		for (key in staffRestrictedRoles) {
			if (GetRoleID(role) == staffRestrictedRoles[key]) {
				roles.errMsg.push("{user} This role `" + role +"` is handled automatically.");
				dbg("restricted for staff");
				return true;
			}
		}
		dbg("after");
	}
	return false;
}

function isRoleRestricted(role, roles,  regexRestrictedRoles, staffRestrictedRoles) {
	//For staff.
	if (MemberHasRole(Server.ID, UserID, getStaffRoleName())){
		return isRoleRestrictedForStaff(role, roles, regexRestrictedRoles, staffRestrictedRoles)
	}
	else{
		//check to see if user try to assign a role equale or above staff.
		var staffRolePosition = getRolePosition(getStaffRoleName());
		var position = getRolePosition(role);

		if (position >= staffRolePosition){
			roles.errMsg.push("{user} Stop Monkeying around! The role `" + role +"` is above your pay grade!");
			return true;
		}

		//final check. check against an array of restricted roles.
		for (var i = 0; i < regexRestrictedRoles.length; i++){
			if (role == regexRestrictedRoles[i]){
				roles.errMsg.push("\nThe role `" + role +"` is restricted. You don't have sufficent permissions!");
				return true;
			}
		}	
		return false;
	}			
}

function isRoleHigherThanUserTopRole(roleName){
	var userTopMostRolePosition = getArrSortedRolesByPosition()[0].position;
	var position = getRolePosition(roleName);
	if (position <= userTopMostRolePosition)
		return false;
	else
		return true;
}
