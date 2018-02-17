function getArrSortRolesByPosition() {
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
	var regex = new RegExp(roleName, 'i');
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

function getUniqueRole(role, roles){
	var roleRGX = new RegExp(role.replace(/\./i, "\\."), 'i');
	var arr = [];

	for (k = 0; k < ServerRoles.length; k++){
		if (roleRGX.test(ServerRoles[k]["Name"])) {
			arr.push(ServerRoles[k]["Name"]);
		}
	}
	dbg(arr);
	if (arr.length > 4){
		roles.errMsg = "\nRole `" + role + "` isn't unique enough. Too many results. Quitting.";
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
		roles.errMsg.push("{user} Staff, this role is above your level of permissions.");
		return true;
	}
	else {
		for (key in staffRestrictedRoles)
			if (GetRoleID(role) == staffRestrictedRoles[key]) {
				roles.errMsg.push("{user } This role is an activity role and it's only handled automatically by Mee6.");
				return true;
			}
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
			roles.errMsg("{user} You're not staff. These roles are restricted!");
			return true;
		}

		//final check. check against an array of restricted roles.
		for (i=0; i < regexRestrictedRoles.length; i++){
			if (role == regexRestrictedRoles[i]){
				roles.errMsg = "\nThis role `" + role +"` is restricted. You don't have sufficent permission";
				return true;
			}
		}	
		return false;
	}			
}

function isRoleHigherThanUserTopRole(roleName){
	arrSortedUserRoles = getArrSortRolesByPosition();
	var position = getRolePosition(roleName)
	if (position <= arrSortedUserRoles[0])
		return false;
	else
		return true;
}
