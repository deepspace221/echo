//DEBUG. Post json data to a webhook or hastebin if longer than 2000 chars.
function debug(content){
//   webhook_url = "https://discordapp.com/api/webhooks/412072411333263360/xdl1PAHXJ3rQowr0VwRG1a5EnavbyoKoZjeOZ4TGE71IEVjfBNFJO1HBh_RSTILT553Q";
//   if(content === ""){
//     content = "Nothing passed into content" 
//   } else if(content.length > 1950 || (typeof content !== "string" && typeof content !== "number")){
//     content = "https://www.hastebin.com/" + JSON.parse(PostJSON("https://www.hastebin.com/documents", "", true, content)).key + ".js" 
//   } else {
//     content = "```js\n" + content + "\n```" 
//   }
//   PostJSON(webhook_url, "", false, {content: content})
} 

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
function getRegexRoleName(rolName){
	var regex = RegEx(roleName, 'i')
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
