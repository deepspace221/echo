//DEBUG. Post json data to a webhook or hastebin if longer than 2000 chars.
function debug(content){
  webhook_url = A_VALID_DISCORD_WEBHOOK_URL
  if(content === ""){
    content = "Nothing passed into content" 
  } else if(content.length > 1950 || (typeof content !== "string" && typeof content !== "number")){
    content = "https://www.hastebin.com/" + JSON.parse(PostJSON("https://www.hastebin.com/documents", "", true, content)).key + ".js" 
  } else {
    content = "```js\n" + content + "\n```" 
  }
  PostJSON(webhook_url, "", false, {content: content})
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
