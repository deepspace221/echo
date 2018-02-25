function getBaseLanguageStr(str){
    if (/\s/.test(str))
        str = str.slice(3);
    return str;
}
function getRoleRelatedChannel(role){
      for (var i = 0; i < ServerChannels.length; i++){
            if (ServerChannels[i].Name == role)
                return "<#" + ServerChannels[i].ID + ">";
      }
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
    }
    
    var role;
    
    for (var i = 0; i < arrUserRoles.length; i++){
        if (isValueInArr(arrLangs, arrUserRoles[i])){
              role = getBaseLanguageStr(arrUserRoles[i]);
              channels.push(getRoleRelatedChannel(role));   
        }    
    }
    dbg(channels);
}
