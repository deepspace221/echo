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
                return a.position - b.position;
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
                        else return ServerRoles[i].Name;
                }      
        }
}


function storeServerRolesSlices(initValues){
        use server_db;
        if (server_db["ServerRolesSorted"] == undefined || initValues){
                var arrSortedServerRolesObj = JSON.stringify(getSeverRolesArrSortedByPosition(0, 250, "obj", true));
                server_db["ServerRolesSorted"] = arrSortedServerRolesObj;
        }
        dbg(arrSortedServerRolesObj);
        var bottomRolesPos = {
                learningBottomRole: "Yiddish",
                 patronBottomRole: getRegexRoleNameOrID("Conlangs Patron"),
        }
        
        var serverRolesSlices = {
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
}


//         var langRolePosObj = {
//                nativeTopRole: getRolePosition("n. Afrikaans"),
//                fluentTopRole: getRolePosition("f. Arabic"),
//                learningTopRole: getRolePosition("Afrikaans"),
//                learningBottomRole: getRolePosition("Yiddish")
//         }; 
        
//         var patronRolePosObj ={
//                 patronTopRole: "♞ German Patron",
//                 patronBottomRole: "♞ Conlangs Patron"
//         }
