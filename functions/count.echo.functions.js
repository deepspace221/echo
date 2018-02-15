function countRoleMembers(roleName){
        var counter = 0;
        for (key in ServerMembers){
            for (k = 0; k < ServerMembers[key].Roles.length; k++){
                if (GetRoleName(ServerMembers[key].Roles[k]) == roleName)
                    counter++;
            }
        } 
        return counter;
}

function getLangsInfoOBJ(arrStudyLangs, fluentIndex, nativeIndex){
            var outputOBJ = {
                nativeField: [],
//                 nativeNames: [],
//                 nativeNum: [],
                nativeRolesCount: "",

                fluentField: [],
//                 fluentNames: [],
//                 fluentNum: [],
                fluentRolesCount: "",

                learningField: [],
//                 learningNames: [],
//                 learningNum: [],
                learningRolesCount: "",
            };

            var firstPosition = arrStudyLangs[0].position;

            var langsSliceOBJ = {
                arrNative: [],
                arrFluent: [],
                arrLearning: []
            }

            langsSliceOBJ.arrLearning = arrStudyLangs.slice(0, fluentIndex);
            langsSliceOBJ.arrFluent = arrStudyLangs.slice(fluentIndex, nativeIndex);
            langsSliceOBJ.arrNative = arrStudyLangs.slice(nativeIndex);

            outputOBJ.nativeRolesCount = langsSliceOBJ.arrNative.length;
            outputOBJ.fluentRolesCount = langsSliceOBJ.arrFluent.length;
            outputOBJ.learningRolesCount = langsSliceOBJ.arrLearning.length;

            produceOutput("Native");
            produceOutput("Fluent");
            produceOutput("Learning");

            function produceOutput(type){
                    var length = langsSliceOBJ["arr" + type].length - 1;
                    var ctr = 0;
                    for (i = 0; i < langsSliceOBJ["arr" + type].length; i++){
                        typeLC = type.toLowerCase();  
                        var roleName = langsSliceOBJ["arr" + type][length - i].name;    
                        var roleCount = "{membercount:" + langsSliceOBJ["arr" + type][length - i].name + "}";
                        var obj = {name: roleName, count: roleCount};
                        outputOBJ[typeLC + "Field"].push(obj);
                    }
            }
            return outputOBJ;
}
function findFirstIndexFluentAndNativeOBJ(arrStudyLangs){
            var obj = {
                nativeIndex: 0,
                fluentIndex: 0
            };
            var flag = true;
            for (i=0; i < arrStudyLangs.length; i++){
                    if (arrStudyLangs[i].name.indexOf("f.") != -1 && flag){
                          obj.fluentIndex = i;
                          flag = false;
                    }
                    else if (!flag && arrStudyLangs[i].name.indexOf("n.") != -1){
                        obj.nativeIndex = i;
                        break;
                    }

            }
            return obj;
}
function getLangCounterOBJ(roleName){
             var langOBJ = {
                    nativeCount: 0,
                    fluentCount: 0,
                    learningCount: 0,
                    total: 0
             };

            langOBJ.nativeCount = countRoleMembers('n. ' + roleName);
            langOBJ.fluentCount = countRoleMembers('f. ' + roleName);
            langOBJ.learningCount = countRoleMembers(roleName);
            langOBJ.total = langOBJ.nativeCount + langOBJ.fluentCount + langOBJ.learningCount;

            return langOBJ;
}

function isLanguageRole(value){
            if (/(n|f)\./.test(roleName)){
                roleName = value.slice(3)
                return true;
            }
            else if (getRolePosition('n. ' + roleName)){ //check for the case that it is not native or fluent
                return true;
            }
            return false;
}

function getValueOfShotestArrElement(arr){
          var min = Math.min.apply(Math, arr.map(function(str) { return str.length; }));
            for (i = 0; i < arr.length; i++){
                if (arr[i].length == min)
                    return arr[i];
         }
}

function isRole(params){ //wroking
        var regExp = new RegExp(params, 'i')
        arrResults = []; 
        var result;

        for (i = 0; i < ServerRoles.length; i++){
            if (regExp.test(ServerRoles[i].Name))
                arrResults.push(ServerRoles[i].Name);              
            if (arrResults.length > 4)
                return;
        }
        if (arrResults.length >= 2){
              result = getValueOfShotestArrElement(arrResults);
        }
        else if (arrResults.length == 1){
             result = arrResults[0];
        }
        return result;
}

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

