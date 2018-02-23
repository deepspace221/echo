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
        var arrOutput = [];
        var bol = true;
        var langType = type.charAt(0) + ".";
        var startColor = arrInput[startIndex].color;
        
        for (var i = startIndex; i < arrInput.length; i++){
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
                        if (arrInput[i].color == startColor){
                                 arrOutput.push(arrInput[i].name); 
                        }
                        else if (bol && type == "learning"){
                                bol = false;
                                startColor = arrInput[i].color; 
                                arrOutput.push(arrInput[i].name); 
                        }
                        else break;
                 }
                 else if (type == "duolingo"){
                      if (arrInput[i].name.indexOf("Tree") != -1)
                                 arrOutput.push(arrInput[i].name); 
                      else break;
                 }
                 else if (type == "permissions"){
                      if (arrInput[i].permissions != "0"){
                              var obj = {}
                              obj.role = arrInput[i].name;
                              obj.permissions = arrInput[i].permissions;
                              arrOutput.push(obj);
                      }
                 }
//                  else if (type == "staff"){
//                       var staff: {
//                             owners: {role: "Owners", users: ["<@303300761398411265>", "<@307663491832086548>"]},
//                             admins: {role: getRegexRoleNamePosOrID("335021703140737034", "name"), users: []},
//                             botDev: {role: getRegexRoleNamePosOrID("403799057472028672", "name"), users: []},
//                             seniorMods: {role: getRegexRoleNamePosOrID("371606096189587458", "name"), users: []},
//                             mods: {role: getRegexRoleNamePosOrID("337640237931036682", "name"), users: []},
//                             techSupport: {role: getRegexRoleNamePosOrID("361816826617004036", "name"), users: []},                      
//                             patrons: {role: getRegexRoleNamePosOrID("361120827665547264", "name"), users: []},
//                             formerStaff: {role: getRegexRoleNamePosOrID("403793828223516673", "name"), users: []}
//                       }
//                       staff.admins.users = getArrUsersInRole(staff.admins.role);
//                       staff.botDev.users = getArrUsersInRole(staff.botDev.role);
//                       staff.seniorMods.users = getArrUsersInRole(staff.seniorMods.role);
//                       staff.mods.users = getArrUsersInRole(staff.mods.role);
//                       staff.techSupport.users = getArrUsersInRole(staff.techSupport.role);
//                       staff.formerStaff.users = getArrUsersInRole(staff.formerStaff.role);
//                  }
        }
        return arrOutput;

        function findFirstIndexOfFluentOrLearning(){
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
        var arrSortedServerRolesObj = [], newPos = 0;
    
        var startPosObj = {
                 patronTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Patrons", "pos")),
                 nativeTopRoleIndex: parseInt(getRegexRoleNamePosOrID("n. Afrikaans", "pos")) + 1,
                 hobbiesTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Satellites", "pos")) + 1,
                 platformsTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Clozemaster", "pos")) + 1,
                 duolingoTopRoleIndex: parseInt(getRegexRoleNamePosOrID("3 Trees LVL 25", "pos")) + 1,
                 memriseTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Memrise LVL 15", "pos")) + 1,
                 viewsTopRoleIndex: parseInt(getRegexRoleNamePosOrID("v. Mobile", "pos")) + 1,
                 activityTopRoleIndex: parseInt(getRegexRoleNamePosOrID("Activity +50", "pos")) + 1
        }
        
         var rolesSlicesObj = {
                staff: {
                    owners: {role: "Owners", users: ["<@303300761398411265>", "<@307663491832086548>"]},
                    admins: {role: getRegexRoleNamePosOrID("335021703140737034", "name"), users: getArrUsersInRole(staff.admins.role)},
                    botDev: {role: getRegexRoleNamePosOrID("403799057472028672", "name"), users: getArrUsersInRole(staff.botDev.role)},
                    seniorMods: {role: getRegexRoleNamePosOrID("371606096189587458", "name"), users: getArrUsersInRole(staff.seniorMods.role)},
                    mods: {role: getRegexRoleNamePosOrID("337640237931036682", "name"), users: getArrUsersInRole(staff.mods.role)},
                    techSupport: {role: getRegexRoleNamePosOrID("361816826617004036", "name"), users: getArrUsersInRole(staff.techSupport.role)},                      
                    patrons: {role: getRegexRoleNamePosOrID("361120827665547264", "name"), users:  getArrUsersInRole(staff.patrons.role)},
                    formerStaff: {role: getRegexRoleNamePosOrID("403793828223516673", "name"), users: getArrUsersInRole(staff.formerStaff.role)}                       
                },
                supporters: {
                    contributers: {role: getRegexRoleNamePosOrID("357941625755926528", "name"), users: []},
                    courseCreator: {role: getRegexRoleNamePosOrID("335566263516397568", "name"), users: []},  
                    partnershipAssistants: {role: getRegexRoleNamePosOrID("403803531955404801", "name"), users: []},
                    supporters: {role: getRegexRoleNamePosOrID("347168010584457216", "name"), users: []},
                    ambassadors: {role: getRegexRoleNamePosOrID("361811261505273856", "name"), users: []}
                },
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
                views: [],
                permissions: []
        }    
        
        if (server_db["ServerRolesSorted"] == undefined || initValues){
                arrSortedServerRolesObj = JSON.stringify(getSeverRolesArrSortedByPosition(0, 250, "obj", true));
                server_db["ServerRolesSorted"] = arrSortedServerRolesObj;
                dbg("storing `ServerRolesSorted`");
        }
        else arrSortedServerRolesObj = JSON.parse(server_db["ServerRolesSorted"]);
//         dbg(arrSortedServerRolesObj);
  
        
//            rolesSlicesObj.patrons = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.patronTopRoleIndex), "patrons");
//            rolesSlicesObj.lang.native = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.nativeTopRoleIndex), "native");
//            rolesSlicesObj.lang.fluent = getRolesSlices(arrSortedServerRolesObj, getNewPos(rolesSlicesObj.lang.native.length, "newPos"), "fluent");
//            rolesSlicesObj.lang.learning = getRolesSlices(arrSortedServerRolesObj, getNewPos(rolesSlicesObj.lang.fluent.length, "newPos"), "learning");
//            rolesSlicesObj.hobbies = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.hobbiesTopRoleIndex), "color");
//            rolesSlicesObj.platforms = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.platformsTopRoleIndex), "color");
//            rolesSlicesObj.duolingo = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.duolingoTopRoleIndex), "duolingo");
//            rolesSlicesObj.memrise = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.memriseTopRoleIndex), "color");
//            rolesSlicesObj.views = getRolesSlices(arrSortedServerRolesObj, getNewPos(startPosObj.viewsTopRoleIndex), "color");
              rolesSlicesObj.permissions = getRolesSlices(arrSortedServerRolesObj, 0, "permissions");
        
        dbg(rolesSlicesObj);
        
        function getNewPos(pos, type){
                if (type == "newPos") {newPos += pos; return newPos;}
                newPos = arrSortedServerRolesObj.length - pos;
                return newPos;    
        }    
}


