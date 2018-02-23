function getArrStudyLangs(bottomRole, topRole){ //working
        var arr = [];
        var ctr = 0;
        for (i=0; i < ServerRoles.length; i++){
                if (ServerRoles[i].Position >= bottomRole && ServerRoles[i].Position <= topRole){
                    var obj = {};
                    ctr++
                    obj.name = ServerRoles[i].Name;
                    obj.position = ServerRoles[i].Position;
                 //    if (false)
                 //   obj.count = countRoleMembers(ServerRoles[i].Name);      
                 //   else obj.count = 0;                         
                    arr.push(obj);
                }
        }
        arr.sort(function(a, b) {
                return a.position - b.position;
        });

        return arr;
}
