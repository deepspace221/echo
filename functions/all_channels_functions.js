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
       return undefined;
}

function getRoleRelatedChannel(name, type){
      name = name.toLowerCase();
      for (var i = 0; i < ServerChannels.length; i++){
            if (type == "lang" && ServerChannels[i].Name == name && ServerChannels[i].ParentID != "399768076112887808"){
                var obj = {
                    category: "",
                    channels: []
                };
                obj.category = ServerChannels[i].ParentID;
                obj.channels.push(ServerChannels[i].ID);
                obj.channels.push(getCatResourcesChannel(obj.category, "resources"));
                obj.channels.push(getCatResourcesChannel(obj.category, "music"));
                return obj;
            }
            else if (type == "other" && ServerChannels[i].Name == name){
                return  ServerChannels[i].ID;
            }
      }
}

function getRoleMobileRelatedChannel(name){
        use server_db;
        roleSlices = JSON.parse(server_db["roleSlices"]); 
        for (var i = 0; i < roleSlices.mobile.channels.length; i++){
            if (roleSlices.mobile.channels.name == name){
                var obj = {
                    category: "",
                    channels: []
                };
                obj.category = roleSlices.mobile.parentID; 
                obj.channels.push(roleSlices.mobile.channels[i].ID);
                return obj;
            }
        }
        return undefined;
}

function serverMap(){
    use server_db;
    var arrUserRoles = getArrSortedRolesByPosition();
    roleSlices = JSON.parse(server_db["roleSlices"]); 
    var arrLangs = roleSlices.lang.native.concat(roleSlices.lang.fluent).concat(roleSlices.lang.learning);

    var channels = {
        lang: [],
        platforms: [],
        hobbies: []
    };
    
    var role;
    
    for (var i = 0; i < arrUserRoles.length; i++){
        if (isValueInArr(arrLangs, arrUserRoles[i])){
              role = getBaseLanguageStr(arrUserRoles[i]);
              var channel = getRoleRelatedChannel(role, "lang");
              if (channel) channels.lang.push(channel); 
              var channel = getRoleMobileRelatedChannel(role);
              if (channel) channels.lang.push(getRoleMobileRelatedChannel(channel));
        }  
        else if (isValueInArr(roleSlices.platforms, arrUserRoles[i])){
              var channel = getRoleRelatedChannel(arrUserRoles[i], "other");
              if (channel) channels.platforms.push(channel);   
        }  
        else if (isValueInArr(roleSlices.hobbies, arrUserRoles[i])){
              var channel = getRoleRelatedChannel(arrUserRoles[i], "other");
              if (channel) channels.hobbies.push(channel);   
        }   
    }
    dbg(channels);
}
