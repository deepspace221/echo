function getSeverRolesArrSortedByPosition(bottomRole, topRole, type, bol){
        var arr = [];
        for (i=0; i < ServerRoles.length; i++){
                if (bol || ServerRoles[i].Position >= bottomRole && ServerRoles[i].Position <= topRole){
                    var obj = {};
                    obj.name = ServerRoles[i].Name;
                    obj.position = ServerRoles[i].Position;   
                    obj.color = ServerRoles[i].Color;
                    obj.ID = ServerRoles[i].ID;
                    obj.permissions = ServerRoles[i].Permissions;
                    arr.push(obj);
                }
        }
        arr.sort(function(a, b) {
                return b.position - a.position;
        });

        if (type == "obj") return arr;
        else {
              var arr2 = []
              for (var i = 0; i < arr.length; i++){
                   arr2.push = arr[i].name;        
              }   
              return arr2;  
        }        
}



function getRegexRoleNameOrID(role, type){
        var r = RegExp(escapeRegExp(role), 'i');
        for (i=0; i < ServerRoles.length; i++){
                if (r.test(ServerRoles[i].Name)){
                        if (type == "ID")   
                                return ServerRoles[i].ID;
                        else if (type == "pos")
                                return ServerRoles[i].Position;
                        else if (type == "name")
                                return ServerRoles[i].Name;
                }      
        }
}

function getArrUsersInRole(roleName){
        var roleID = GetRoleName(roleName);
        var arr = [];
        for (var i = 0; i < ServerMembers.length; i++){
                if (ServerMembers[i].Roles == roleID){
                     var userName = "<@" + ServerMembers[i].User.ID + ">"
                     arr.push(userName);          
                }
        }
        return arr;
}

function getRolesSlices(arrInput, startIndex, type){
        var arrOutput = [];
        var patron = {role: "", users: []};
        var arrLength = arrInput.length;
        var langType = type.charAt(0) + ".";
        
        if (!startIndex) startIndex = findFirstIndexOfFluentOrLearning();
        
        for (var i = arrLength - startIndex; i < arrLength; i++){
                 if (type == "patron"){
                      if (/patron/.test(arrInput[i].name)){
                           var roleName = arrInput[i].name
                           patron.role = roleName;
                           patron.users = getArrUsersInRole(roleName);   
                           arrOutput.push(patron);                                  
                      }
                      else
                        return arrOutput;        
                 }
                 else if (type == "native" || type == "fluent" || type == "learning"){
                          if (arrInput[i].indexOf(langType) != -1)
                                 arrOutput.push(arrInput[i].name); 
                          else
                                 return arrOutput;
                 }
                         
        }
        return arr;

        function findFirstIndexOfFluentOrLearning(){
                for (var i = 0; i < arrInput.length; i++)
                        if (arrInput[i].name.indexOf(langType);
                            return arrInput[i].position;  
        }
}

function storeServerRolesSlices(initValues){
        use server_db;
        
        var startPosObj = {
                 patronTopRoleIndex: parseInt(getRegexRoleNameOrID("Patrons", "pos")) - 1,
                 nativeTopRoleIndex: parseInt(getRegexRoleNameOrID("Yiddish", "pos")),
        }
        
         var rolesSlicesObj = {
                lang: {
                     native: [],
                     fluent: [],
                     learning: []
                },
                patrons: [{role: "", users: ""}],
                hobbies: [],
                platforms: [],
                duolingo: [],
                memrise: [],
                activity: []
        }    
        
        if (server_db["ServerRolesSorted"] == undefined || initValues){
                var arrSortedServerRolesObj = JSON.stringify(getSeverRolesArrSortedByPosition(0, 250, "obj", true));
                server_db["ServerRolesSorted"] = arrSortedServerRolesObj;
                dbg("storing `ServerRolesSorted`");
        }
//         dbg(arrSortedServerRolesObj);
        
           rolesSlicesObj.patrons = getRolesSlices(arrSortedServerRolesObj, startPosObj.patronTopRoleIndex, "patron");
           dbg(rolesSlicesObj.patrons); 
//         rolesSlicesObj.lang.native = getRolesSlices(arrSortedServerRolesObj, startPosObj.nativeTopRoleIndex, "native");
//         rolesSlicesObj.lang.fluent = getRolesSlices(arrSortedServerRolesObj, "", "fluent");
//         rolesSlicesObj.lang.learning = getRolesSlices(arrSortedServerRolesObj, "", "learning");
                        
//         rolesSlicesObj.patrons = getRolesSlices(arrSortedServerRolesObj, startPosObj.patronTopRoleIndex, "patron")
//         rolesSlicesObj.patrons = getRolesSlices(arrSortedServerRolesObj, startPosObj.patronTopRoleIndex, "patron")


}


