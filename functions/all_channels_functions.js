function getBaseLanguageStr(str){
    if (/\s/.test(str))
        str = str.slice(3);
    return str;
}

function getCatResourcesChannel(category, name){
       for (var i = 0; i < ServerChannels.length; i++){
            if (ServerChannels[i].ParentID == category && ServerChannels[i].Name == name)
                return ServerChannels[i].ID;
       }
       return "Not found.";
}

function getRoleRelatedChannel(role, type){
      role = role.toLowerCase();
      for (var i = 0; i < ServerChannels.length; i++){
            if (type == "lang" && ServerChannels[i].Name == role){
                var obj = {
                    category: "",
                    channels: []
                };
                obj.category = ServerChannels[i].ParentID;
                obj.channels.push(ServerChannels[i].ID);
                if (obj.category != "399768076112887808"){
                    obj.channels.push(getCatResourcesChannel(obj.category, "resources"));
                    obj.channels.push(getCatResourcesChannel(obj.category, "music"));
                }
                return obj;
            }
            else if (type == "other" && ServerChannels[i].Name == role){
                return  ServerChannels[i].ID;
            }
      }
}

function serverMap(){
    use server_db;
    var arrUserRoles = getArrSortedRolesByPosition();
    roleSlices = JSON.parse(server_db["roleSlices"]); 
    var arrLangs = roleSlices.lang.native.concat(roleSlices.lang.fluent).concat(roleSlices.lang.learning);
    
    var channels = {
        lang: [{}],
        platforms: [],
        hobbies: []
    };
    
    var role;
    
    for (var i = 0; i < arrUserRoles.length; i++){
        if (isValueInArr(arrLangs, arrUserRoles[i])){
              role = getBaseLanguageStr(arrUserRoles[i]);
              channels.lang.push(getRoleRelatedChannel(role, "lang"));   
        }  
        else if (isValueInArr(roleSlices.platforms, arrUserRoles[i])){
              channels.platforms.push(getRoleRelatedChannel(arrUserRoles[i], "other"));   
        }  
        else if (isValueInArr(roleSlices.hobbies, arrUserRoles[i])){
              channels.hobbies.push(getRoleRelatedChannel(arrUserRoles[i], "other"));   
        }   
    }
    dbg(channels);
}
