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



function getRegexRoleNamePosOrID(role, type){
        var r = RegExp(escapeRegExp(role), 'i');
        for (var i = 0; i < ServerRoles.length; i++){
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
        var roleID = GetRoleID(roleName);
        var arr = [];
//         dbg(roleID);
        for (var i = 0; i < ServerMembers.length; i++){
             for (var j = 0; j < ServerMembers[i].Roles.length; j++){
                if (ServerMembers[i].Roles[j] == roleID){
                     var userName = "<@" + ServerMembers[i].User.ID + ">"
//                      dbg(userName);
                     arr.push(userName);          
                }
             }
        }
        return arr;
}


function getRolesSlices(arrInput, startIndex, type){
        if (!startIndex) startIndex = findFirstIndexOfFluentOrLearning();
        var arrOutput = [];
        var bol = true;
        var arrLength = arrInput.length;
        var langType = type.charAt(0) + ".";
        var startColor = arrInput[arrLength-startIndex].color;
//         dbg(langType);
        
        for (var i = arrLength - startIndex; i < arrLength; i++){
//                  dbg(i);
                 if (type == "patrons"){
                      if (/patron/i.test(arrInput[i].name)){
                           var roleName = arrInput[i].name
                           var patron = {role: "", users: []};
                           patron.role = roleName;
                           if (bol != false){
                                   bol = (getArrUsersInRole(roleName).length == 0) ? false : true;           
                                   patron.users = getArrUsersInRole(roleName); 
                           } else patron.users = [];
                           arrOutput.push(patron);                                  
                      }
                      else
                        break;        
                 }
                 else if (type == "native" || type == "fluent" || type == "learning"){
//                           dbg(i);
                          dbg("name " + arrInput[i].name);
                          if (arrInput[i].name.indexOf(langType) != -1)
                                 arrOutput.push(arrInput[i].name); 
                          else
                                 break;
                 }
                 else if (type == "hobbies"){
                        if (arrInput[i].color == startColor) 
                                 arrOutput.push(arrInput[i].name); 
                        else
                                 break;
                 }
                         
        }
        return arrOutput;

        function findFirstIndexOfFluentOrLearning(){
                for (var i = 0; i < arrInput.length; i++)
                        if (arrInput[i].name.indexOf(langType))
                            return arrInput[i].position;  
        }
}

function storeServerRolesSlices(initValues){
        use server_db;
        var arrSortedServerRolesObj = [];
    
        var startPosObj = {
                 patronTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Patrons", "pos")),
                 nativeTopRoleIndex: parseInt(getRegexRoleNamePosOrID("n. Afrikaans", "pos")) + 1,
                 hobbiesTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Satellites", "pos")) + 1,
                 platformsTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Clozemaster", "pos")) + 1,
                 duolingoTopRoleIndex: parseInt(getRegexRoleNamePosOrID("3 Trees LVL 25", "pos")) + 1,
                 memriseTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Memrise LVL 15", "pos")) + 1
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
                arrSortedServerRolesObj = JSON.stringify(getSeverRolesArrSortedByPosition(0, 250, "obj", true));
                server_db["ServerRolesSorted"] = arrSortedServerRolesObj;
                dbg("storing `ServerRolesSorted`");
        }
        else arrSortedServerRolesObj = JSON.parse(server_db["ServerRolesSorted"]);
//         dbg(arrSortedServerRolesObj);
        
           dbg("nativeIndex: " + startPosObj.nativeTopRoleIndex);
           rolesSlicesObj.patrons = getRolesSlices(arrSortedServerRolesObj, startPosObj.patronTopRoleIndex, "patrons");
//            dbg(rolesSlicesObj.patrons); 
           rolesSlicesObj.lang.native = getRolesSlices(arrSortedServerRolesObj, startPosObj.nativeTopRoleIndex, "native");
           dbg(JSON.stringify(rolesSlicesObj.lang.native));
           rolesSlicesObj.lang.fluent = getRolesSlices(arrSortedServerRolesObj, "", "fluent");
           dbg(JSON.stringify(rolesSlicesObj.lang.fluent));
           rolesSlicesObj.lang.learning = getRolesSlices(arrSortedServerRolesObj, "", "learning");
           dbg(JSON.stringify(rolesSlicesObj.lang.learning));                       
//            rolesSlicesObj.hobbies = getRolesSlices(arrSortedServerRolesObj, startPosObj.hobbiesTopRoleIndex, "hobbies")
//            rolesSlicesObj.platforms = getRolesSlices(arrSortedServerRolesObj, startPosObj.platformsTopRoleIndex, "platforms")
//            rolesSlicesObj.duolingo = getRolesSlices(arrSortedServerRolesObj, startPosObj.duolingoTopRoleIndex, "duolingo")
//            rolesSlicesObj.memrise = getRolesSlices(arrSortedServerRolesObj, startPosObj.memriseTopRoleIndex, "memrise")

}


