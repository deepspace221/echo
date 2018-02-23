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
        if (startIndex == "") startIndex = findFirstIndexOfFluentOrLearning();
//         dbg("startInedx " + startIndex);
        var arrOutput = [];
        var bol = true;
        var langType = type.charAt(0) + ".";
        var startColor = arrInput[startIndex].color;
//         dbg(startColor);
        
        for (var i = startIndex; i < arrInput.length; i++){
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
                 else if (type == "native" || type == "fluent"){
                          if (arrInput[i].name.indexOf(langType) != -1){
                                 arrOutput.push(arrInput[i].name); 
                          }
                          else
                                 break;
                 }
                 else if (type == "learning" || type == "color") {
//                         dbg("role color" + arrInput[i].color + " start color" + startColor + " role name" + arrInput[i].name);
                        if (arrInput[i].color == startColor){
                                 arrOutput.push(arrInput[i].name); 
                        }
                        else if (bol && type == "learning"){
                                bol = false;
                                startColor = arrInput[i].color; 
//                                 dbg(startColor); 
                                arrOutput.push(arrInput[i].name); 
                        }
                        else break;
                 }
                 else if (type == "duolingo"){
                      if (arrInput[i].name.indexOf("Tree") != -1)
                                 arrOutput.push(arrInput[i].name); 
                      else break;
                 }
                 else if (type == "memrise"){
                      if (arrInput[i].name.indexOf("Memrise") != -1)
                                 arrOutput.push(arrInput[i].name); 
                      else break;  
                 }
                 else if (type == "views"){
                      if (arrInput[i].name.indexOf("v.") != -1)
                                 arrOutput.push(arrInput[i].name); 
                      else break;  
                 }                       
                         
        }
//         dbg(JSON.stringify(arrOutput));
        return arrOutput;

        function findFirstIndexOfFluentOrLearning(){
//                 dbg("finding index");
                for (var i = 0; i < arrInput.length; i++){
                         if (type == "fluent"){
                            if (arrInput[i].name.indexOf("f.") != -1)
                                return arrInput[i].position;         
                         }
                         else if (type == "learning"){
                            if (arrInput[i].name.indexOf("f. Other") != -1)
                                return arrInput[i+1].position;                           
                         }

                }
        }
}

function storeServerRolesSlices(initValues){
        use server_db;
        var arrSortedServerRolesObj = [], newPos;
    
        var startPosObj = {
                 patronTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Patrons", "pos")),
                 nativeTopRoleIndex: parseInt(getRegexRoleNamePosOrID("n. Afrikaans", "pos")) + 1,
                 hobbiesTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Satellites", "pos")) + 1,
                 platformsTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Clozemaster", "pos")) + 1,
                 duolingoTopRoleIndex: parseInt(getRegexRoleNamePosOrID("3 Trees LVL 25", "pos")) + 1,
                 memriseTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Memrise LVL 15", "pos")) + 1,
                 viewsTopRoleIndex: parseInt(getRegexRoleNamePosOrID("v. Mobile", "pos")) + 1
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
                activity: [],
                views: []
        }    
        
        if (server_db["ServerRolesSorted"] == undefined || initValues){
                arrSortedServerRolesObj = JSON.stringify(getSeverRolesArrSortedByPosition(0, 250, "obj", true));
                server_db["ServerRolesSorted"] = arrSortedServerRolesObj;
                dbg("storing `ServerRolesSorted`");
        }
        else arrSortedServerRolesObj = JSON.parse(server_db["ServerRolesSorted"]);
//         dbg(arrSortedServerRolesObj);
        
           rolesSlicesObj.patrons = getRolesSlices(arrSortedServerRolesObj, startPosObj.patronTopRoleIndex, "patrons");
           rolesSlicesObj.lang.native = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.nativeTopRoleIndex), "native");
           newPos += rolesSlicesObj.lang.native.length;
           rolesSlicesObj.lang.fluent = getRolesSlices(arrSortedServerRolesObj, newPos, "fluent");
           newPos += rolesSlicesObj.lang.fluent.length;
           rolesSlicesObj.lang.learning = getRolesSlices(arrSortedServerRolesObj, newPos, "learning");
           rolesSlicesObj.hobbies = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.hobbiesTopRoleIndex), "color");
           rolesSlicesObj.platforms = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.platformsTopRoleIndex), "color");
           dbg(JSON.stringify(rolesSlicesObj.platforms)); 
           rolesSlicesObj.duolingo = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.duolingoTopRoleIndex), "duolingo");
           dbg(rolesSlicesObj.duolingo);    
           rolesSlicesObj.memrise = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.memriseTopRoleIndex), "memrise");
           dbg(rolesSlicesObj.memrise); 
           rolesSlicesObj.views = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.viewsTopRoleIndex), "views");
           dbg(rolesSlicesObj.views); 
        
        
        function getNewPos(pos, type){
                if (type == "add") return arrSortedServerRolesObj.length + pos;
                newPos = arrSortedServerRolesObj.length - pos;
                return arrSortedServerRolesObj.length - pos;    
        }    
}


