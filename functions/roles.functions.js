function getArrSortedRolesByPosition() {
        var arr = new Array();
	var arr2 = [];
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
	
	for (var i = 0; i < byPos.length; i++){
		arr2.push(byPos[i].name);	
	}
	
        return arr2;
}


function getObjSortedRolesByPosition() {
        var arr = new Array();
        for (var i = 0; i < UserRoles.length; i++) {
            for (var j = 0; j < ServerRoles.length; j++) {
                if (UserRoles[i] === ServerRoles[j]["ID"]) {
                    var role = {
                        position: ServerRoles[j]["Position"],
                        name: GetRoleName(UserRoles[i]),
			color: ServerRoles[j]["Color"]
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


function getUniqueRole(role, roles){
	var roleRGX = new RegExp(escapeRegExp(role), "i");
// 	var roleRGX = new RegExp(role, "i");
	var arr = [];
	dbg(roleRGX);

	for (var k = 0; k < ServerRoles.length; k++){
		if (roleRGX.test(ServerRoles[k]["Name"])) {
			arr.push(ServerRoles[k]["Name"]);
		}
	}

// 	dbg("array regex: " + arr);

	if (arr.length > 4){
		var temp = "\\b" + role + "\\b"; var rMatch;
		var r = new RegExp(temp, 'i');
		for (var i = 0; i < arr.length; i++){
		        rMatch = arr[i].match(r)[0];
			break;
		}
		
		if (rMatch){
			return rMatch;	
		}
		else{
			roles.errMsg.push("\nRole `" + role + "` isn't unique enough. Too many results. Quitting.");
			return false;
		}
	}
	else if (arr.length == 4 || arr.length == 3 || arr.length == 2){
		return findShortestStringInArr(arr);
	}
	else if (arr.length == 1){
		return arr[0];
	}
	return false;
}

function isRoleHigherThanUserTopRole(roleName){
	var userTopMostRolePosition = getObjSortedRolesByPosition()[0].position;
	var position = getRolePosition(roleName);
	if (position < userTopMostRolePosition)
		return false;
	else
		return true;
}

function isRoleRestrictedForStaff(role, roles, regexRestrictedRoles, staffRestrictedRoles){
	if (isRoleHigherThanUserTopRole(role)){
		roles.errMsg.push("Err: the role `" + role + "` is above your clearance level!");
		return true;
	}
	else {
		for (key in staffRestrictedRoles) {
			if (GetRoleID(role) == staffRestrictedRoles[key]) {
				roles.errMsg.push("Err: This role `" + role +"` is handled automatically.");
// 				dbg("restricted for staff");
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
			roles.errMsg.push("Err: stop monkeying around! The role `" + role +"` is above your pay grade!");
			return true;
		}

		//final check. check against an array of restricted roles.
		for (var i = 0; i < regexRestrictedRoles.length; i++){
			if (role == regexRestrictedRoles[i]){
				roles.errMsg.push("\nErr: the role `" + role +"` is restricted. You don't have sufficent permissions!");
				return true;
			}
		}	
		return false;
	}			
}



function getRolesOutput(roles){
	var give = "";
	var take = "";
	var output = "";
	if (roles.give.length >= 2){
                give = "{m?roles_db:givequiet}:={role}" + roles.give.shift() + ", " + roles.give.shift() + ", Basic{/role}";
	}
	else if (roles.give.length == 1){
	        give = "{role:" + roles.give.shift() +"}";
	}

	if (roles.take.length >= 2){
                take = "{m?roles_db:takequiet}:={take}Basic, " + roles.take.shift() + ", " + roles.take.shift() + "{/take}";
	}
	else if (roles.take.length == 1){
	        take = "{take:" + roles.take.shift() + "}";
	}
	if (give != "") output += "\n" + give + "\n";
	if (take != "") output += "\n" + take;

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
	       roleList += "`" + roles.giveMsg[i] + "` ";
	}
	for (var i = 0; i < roles.takeMsg.length; i++){
	       takeList += "`" +roles.takeMsg[i] + "` ";
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
	var giveErrMsg = "'Err: too many roles at once. I couldn't assign the following roles: ";
	var takeErrMsg = "'Err: Too many roles at once. I couldn't take the following roles: ";
	var output = "";
	
	for (var i = 0; i < roles.give.length; i++)
		give = "` " + roles.give.shift() + "` ";	

	for (var i = 0; i < roles.take.length; i++)
		take = "` " + roles.take.shift() + "` ";

	if (give != "") output = giveErrMsg + give + "\n";
	if (take != "") output = takeErrMsg + take + "\n";

	return output;
}


function countNativeFlunetRoles(arr, nativeFluentCtr, operation){
	var native = 0;
	var fluent = 0
	for (var i = 0; i < arr.length; i++){
		if (/n\.\s/.test(arr[i]))
			native++;
		else if (/f\.\s/.test(arr[i]))
			fluent++;
	}
	if (operation == "substract"){
		nativeFluentCtr.native -= native;
		nativeFluentCtr.fluent -= fluent;
	}
	else{
		nativeFluentCtr.native += native;
		nativeFluentCtr.fluent += fluent;
	}
}

function verifyUserHasNativeAndChkPolyglot(roles){
	var nativeFluentCtr = {
		native: 0,
		fluent: 0
	}
	var arrSortedUserRoles = getArrSortedRolesByPosition();

	countNativeFlunetRoles(arrSortedUserRoles, nativeFluentCtr);
	countNativeFlunetRoles(roles.give, nativeFluentCtr);
	countNativeFlunetRoles(roles.take, nativeFluentCtr, "substract");

	if (nativeFluentCtr.native < 1) {
		var limit = Math.abs(nativeFluentCtr.native) + 1;
		for (var i = 0; i < roles.take.length && limit > 0; i++){
			if (/n\.\s/.test(roles.take[i])) {
				limit--;
				roles.errMsg.push("ERR: Unable to preform role removel **" + roles.take[i] + "** (user only native language).");
				roles.takeMsg[i] = "";
				roles.take[i] = "Deleted";
			}
		}
	}
	
	var polyglot = nativeFluentCtr.native + nativeFluentCtr.fluent;
	if (polyglot >= 4){
// 		dbg("native: " + nativeFluentCtr.native + " flunet: " + nativeFluentCtr.fluent);
		roles.polyglot = "true (" + polyglot + "/4)";
		if (!MemberHasRole(Server.ID, UserID, "Polyglot")){
			roles.give.push("Polyglot");
			roles.notesMsg.push("\nPolyglot role has been assigned, since you're native or fluent in at least 4 languages.");			
		}
	}
	else {
		roles.polyglot = "false (" + polyglot + "/4)";
		if (MemberHasRole(Server.ID, UserID, "Polyglot")){
			roles.take.push("Polyglot");
			roles.notesMsg.push("\nPolyglot role has been taken. User is not native or fluent in at least 4 languages.");
		}
	}
}

function getOutputStrings(roles){
	
// 	dbg("roles.takeMsg: " + roles.takeMsg);
	
	roles.giveMsgStr =  getRolesFieldOutputSplitted(roles.giveMsg);
	roles.takeMsgStr =  getRolesFieldOutputSplitted(roles.takeMsg);
	roles.notesMsgStr =  createArrOutputNewLinesSeprated(roles.notesMsg);
	roles.errMsgStr = createArrOutputNewLinesSeprated(roles.errMsg);
	
// 	dbg("roles.takeMsgStr: " + roles.takeMsgStr);

// 	roles.giveMsgStr =  createArrOutputCommaSeprated(roles.giveMsg);
// 	roles.takeMsgStr =  createArrOutputCommaSeprated(roles.takeMsg);
// 	roles.notesMsgStr =  createArrOutputCommaSeprated(roles.notesMsg);
// 	roles.errMsgStr = createArrOutputCommaSeprated(roles.errMsg);
}


function getRolesFieldOutputSplitted(arr){
	
	var output = "```md\n";
	
	var learningPos = {
		top: getRolePosition('Afrikaans'),
		bottom: getRolePosition('Yiddish')
	};
	
	var obj = {
		roleNative: [],
		roleFluent: [],
		roleLearning: [],	
		roleOther: []
	};
		
	for (var i = 0; i < arr.length; i++){
		var rolePos = getRolePosition(arr[i])
		if (/n\./.test(arr[i]))
			obj.roleNative.push(arr[i]);
		else if (/f\./.test(arr[i]))
			obj.roleFluent.push(arr[i]);
		else if (/\s/.test(arr[i]))
			obj.roleOther.push(arr[i]);	 
		else if (rolePos >= learningPos.bottom && rolePos <= learningPos.top)
			obj.roleLearning.push(arr[i]);	
		else if (arr[i] != "")
			obj.roleOther.push(arr[i]);
	}	
		
	if (obj.roleNative.length != 0) output += "  <Native> " + createArrOutputCommaSeprated(obj.roleNative) + "\n";
	if (obj.roleFluent.length != 0) output += "  <Fluent> " + createArrOutputCommaSeprated(obj.roleFluent) + "\n";
	if (obj.roleLearning.length != 0) output += "<Learning> " + createArrOutputCommaSeprated(obj.roleLearning) + "\n";
	if (obj.roleOther.length != 0) output += "   <Other> " + createArrOutputCommaSeprated(obj.roleOther) + "\n";
	if (output.length == 6) output += "     <NaN>";

	output += "```";
	return output;		
}

function isMemberHasRole(guildID, userID, role){
	var user = getUserOBJ(userID);
	for (var i = 0; i < user.Roles.length; i++){
		if (user.Roles[i] == GetRoleID(role)){
			return true;	
		}
	}	
	return false;
}

function isMemberHasRole2(role){
	var user = getUserOBJ(UserID);
	for (var i = 0; i < user.Roles.length; i++){
		if (user.Roles[i] == GetRoleID(role)){
			return true;	
		}
	}	
	return false;
}

function removeConflictingRoles(roles){
  var arr = [];
  for (var i = 0; i < roles.give.length; i++){
	dbg(arr); 
        var role = roles.give[i];
        var baseRole = role;
        if (isLanguageRole(role)){
                    if (/(n\.|f\.)\s/.test(role)){
                      baseRole = role.slice(3);
                    }
                    var index;
                    for (var j = 0; j < roles.give.length; j++){
                      if (roles.give[j].indexOf(baseRole) != -1)
                        index = j;
                    }   
		    role = roles.give[index];
// 		    dbg("index is " + index);
                    if (!isValueInArr(arr, baseRole)) {
// 			   dbg("adding roles");
                           arr.push(role);
// 			   dbg("base role " + baseRole);
                           for (var k = 0; k < UserRoles.length; k++){
                                  if (GetRoleName(UserRoles[k]).indexOf(baseRole) != -1){
					    var takeRole = GetRoleName(UserRoles[k]);
// 					    dbg("found match: " + takeRole);
// 				            dbg("index k: " + index);
					    if (!isValueInArr(roles.take, takeRole)){
						  dbg("removing roles");
						  roles.take.push(takeRole);
					          roles.takeMsg.push(takeRole);
						  roles.notesMsg.push("Role **" + takeRole + "** has been removed (conflicting language roles).");
                                           }
                                 }
                        }         
                  }
      } else {
        arr.push(role);
      }
  }
  dbg(arr);
  roles.give = arr;         
}


function isValidRole(str){
	for (var i = 0; i < ServerRoles.length; i++){
		if (ServerRoles[i].Name == str)
			return true;
	}
	return false;
}

function inRole(role){
	var arrUsers = [];
	role = getRegexRoleName(role);
	for (var i = 0; i < ServerMembers.length; i++){
		for (var k = 0; k < ServerMembers[i].Roles.length; k++){
			if (ServerMembers[i].Roles[k] == GetRoleID(role))
				arrUsers.push("<@" + ServerMembers[i].User.ID + ">");
		}
	}
	return getInRoleEmbed(arrUsers, role);
}


function getRegexRoleName(roleName){
	var arr = [];
	var regex = new RegExp(roleName, 'i');
	for (var i = 0; i < ServerRoles.length; i++){
		if (regex.test(ServerRoles[i].Name)){
			arr.push(ServerRoles[i].Name);	
		}	
	}
	if (arr.length > 1){
		regex = "^" + roleName + "$";
		regex = new RegExp(regex, 'i')
		for (var i = 0; arr.length; i++){
			if (regex.test(arr[i])){
				return arr[i];
			}
		}
		return "";
	}	
	return arr[0];
}
