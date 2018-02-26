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
        name = name.toLowerCase();
        roleSlices = JSON.parse(server_db["roleSlices"]); 
        for (var i = 0; i < roleSlices.mobile.channels.length; i++){
            if (roleSlices.mobile.channels[i].name == name){
                return roleSlices.mobile.channels[i].ID;
            }
        }
        return undefined;
}

function getMainChannels(arrChannels){
    var arr = [];

    for (var i = 0; i < arrChannels.length; i++){ 
        for (var j = 0; j < ServerChannels.length; j++){
                if (ServerChannels[j].Name == arrChannels[i]){
                    arr.push(ServerChannels[j].ID);
                    break;
                }
        }
    }
    return arr;
}

function serverMap(){
    use server_db;
    var arrUserRoles = getArrSortedRolesByPosition();
    roleSlices = JSON.parse(server_db["roleSlices"]); 
    var arrLangs = roleSlices.lang.native.concat(roleSlices.lang.fluent).concat(roleSlices.lang.learning);
    
    var arrMainChannels = {
        general: ["welcome","lounge","bots-playground","feedback-inquiries","info-and-rules"],
        community: ["achievement-showcase","partner-search","music-swap-world"],
        lang: ["language-resources","write-a-sentence"],
        hooks: ["hooks-polyglots","hooks-travel-culture"]
    }

    var channelsObj = {
        lang: [],
        mobile: [],
        platforms: [],
        hobbies: [],
        main: {
            general: getMainChannels(arrMainChannels.general),
            community: getMainChannels(arrMainChannels.community),
            lang: getMainChannels(arrMainChannels.lang),
            hooks: getMainChannels(arrMainChannels.hooks)
        }
    };
    
    var role;
    
    for (var i = 0; i < arrUserRoles.length; i++){
        if (isValueInArr(arrLangs, arrUserRoles[i])){
              role = getBaseLanguageStr(arrUserRoles[i]);
              var channel = getRoleRelatedChannel(role, "lang");
              if (channel) channelsObj.lang.push(channel); 
              var channel = getRoleMobileRelatedChannel(role);
              if (channel) channelsObj.mobile.push(channel);
        }  
        else if (isValueInArr(roleSlices.platforms, arrUserRoles[i])){
              var channel = getRoleRelatedChannel(arrUserRoles[i], "other");
              if (channel) channelsObj.platforms.push(channel);   
        }  
        else if (isValueInArr(roleSlices.hobbies, arrUserRoles[i])){
              var channel = getRoleRelatedChannel(arrUserRoles[i], "other");
              if (channel) channelsObj.hobbies.push(channel);   
        }   
    }
    return getServerMapEmbed();
    dbg(channelsObj);
}
