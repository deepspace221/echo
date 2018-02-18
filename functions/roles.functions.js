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
// 	var roleRGX = new RegExp(escapeRegExp(role));
	var roleRGX = new RegExp(role, "i");
	var arr = [];

	for (var k = 0; k < ServerRoles.length; k++){
		if (roleRGX.test(ServerRoles[k]["Name"])) {
			arr.push(ServerRoles[k]["Name"]);
		}
	}

// 	dbg("array regex: " + arr);
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
// 		dbg("staffRestrictedRoles check retured false");
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

function getRolesOutput(roles){
	var give = "";
	var take = "";
	var output = "";
	if (roles.give.length >= 2){
                give = "{m?roles_db:givequite}:={role}" + roles.give.shift() + ", " + roles.give.shift() + ", Basic{/role}";
	}
	else if (roles.give.length == 1){
	        give = "{role:" + roles.give.shift() +"}";
	}

	if (roles.take.length >= 2){
                take = "{m?roles_db:takequite}:={take}" + roles.take.shift() + ", " + roles.take.shift() + ", Basic{/take}";
	}
	else if (roles.take.length == 1){
	        take = "{take:" + roles.take.shift() + "}";
	}
	if (give != "") output += "\n" + give + "\n";
	if (take != "") output += "\n" + take + "\n";

// 	dbg("give and take: " + output);
	return output;
}

function getRolesMessages(roles){
	var errMsg = "";
	var giveMsg = "I have given you the roles: ";
	var takeMsg = "I have taken from you the roles: ";
	var roleList = "";
	var takeList = "";
	var output = "";
	var user = "<@" + UserID + "> \n";
	
	for (var i = 0; i < roles.giveMsg.length; i++){
	       roleList += "`" + roles.giveMsg.shift() + "` ";
	}
	for (var i = 0; i < roles.takeMsg.length; i++){
	       takeList += "`" +roles.takeMsg.shift() + "` ";
	}
// 	errMsg += roles.errMsg.forEach(function (element){
// 	        return element + "\n"
// 	});
	
	if (roleList != "") giveMsg += roleList + "\n"; else giveMsg = "";
	if (takeList != "") takeMsg += takeList + "\n"; else takeMsg = "";
	output = user + giveMsg + takeMsg + errMsg;
// 	dbg("messages: " + output);
	return output;
}

function getRolesLeftovers(roles){
	var give = "";
	var take = "";
	var giveErrMsg = "'Too many roles at once ERROR. I couldn't assign the following roles: ";
	var takeErrMsg = "'Too many roles at once ERROR. I couldn't take the following roles: ";
	var output = "";
	
	for (var i = 0; i < roles.give.length; i++)
		give = "` " + roles.give.shift() + "` ";	

	for (var i = 0; i < roles.take.length; i++)
		take = "` " + roles.take.shift() + "` ";

	if (give != "") output = giveErrMsg + give + "\n";
	if (take != "") output = takeErrMsg + take + "\n";

	return output;
}
