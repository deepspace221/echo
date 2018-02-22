function initInviteOBJ(username){
        var obj = [{
                inviteCodes: [],
                counter: 1,
                userID: "",
                username: username
        }];

        for (i = 0; i < ServerMembers.length; i++){
            if (ServerMembers[i].User.Username == username)   {
                    userID = ServerMembers[i].User.ID;
                    obj[0].userID = userID;
                    obj[0].inviteCodes.push(arrInviteCodes);
                    return obj;
            }
        } 
}


function updateInviteCodeCounter(index){
        for (i =0; i< json[index].inviteCodes.length; i++){
                   if (json[index].inviteCodes[i][0] == inviteCodes){
                           json[index].inviteCodes[i][1] += 1;
                           return true;
                   }
         }
         return false;
}

function getDBUserIDIndex(json, userID){
        var result; 

        for (i = 0; i < json.length; i++){
            for (k=0; k < inviteCodes.length; k++){
                if (json[i].inviteCodes[k] == inviteCodes)
                    result = i;
            }
        }

        if (result != undefined){
                return result
        }

        for (i = 0; i < json.length; i++){
                if (json[i].userID == userID)
                    return i;
        }
}

function getWelcomeMsg(){
    var welcome = " \
    \n**Welcome to {guild|name}, {/user}!**  \
    \n \
    \n{user} Please type **\help** to view quick information on how to set up your roles for your **NATIVE** and **LEARNING LANGUAGES**. \
    \nPlease note that **access** to the language categories **is dependent upon this.** \
    \n \
    \nYou may visit <#338382759145766932> for the rules and a rough idea of the server's layout. \
    \n \
    \nif you have any questions please tag any online staff member. \
    \n<@&361811261505273856> \
    \n \
    \n**QUICK SERVER DIRECTIONS:** \
    \n<#338382759145766932> << Rules and server layout overview \
    \n<#335379990424059905> << Important server notfications \
    \n<#403541408322945024> << Introduce yourself to the community \
    \n<#338186206787403777> << Find a language partner \
    \n<#407687763354320916> << Our main channel \
    \n<#359689702049054720> << Our cool partners \
    \n<#401302457507905536> << Frequantly asked questions \
    \n \
    \nUser joind with invite code: **" + inviteCodes +"** \
    \n" + lastLine + " \
    ";
    return welcome; 
}


function invitesPingToggle(UserID){
        use server_db;
        invites = JSON.parse(server_db["invites"]);
        
        if (invites.toggle == undefined){
                arr = [];
                invites.toggle = arr.push(UserID);
                return "off";
        }
        else {
                for (i = 0; i < invites.toggle.length; i++){
                        if (invites.toggle[i] == UserID){
                                invites.toggle.splice(i, 1);
                                server_db["invites"] = JSON.stringify(invites);
                                return "on";
                        }
                }
                invites.toggle.push(UserID);
                server_db["invites"] = JSON.stringify(invites);  
                return "off";
        }
}


function getMemberObj(){
        var memberObj =  {
                 joinedAt: "",
                 userName: "",
                 discriminator: "",
                 avatar: "",
                 roles: []
        }   
        return memberObj;
}

function initServerMembersDB(){
    use server_members_db;  
    var membersObj = {};
    for (i = 0; i < ServerMembers.length; i++) {
            var memberObj = getMemberObj();
            var userID = ServerMembers[i].User.ID;
            memberObj.joinedAt = ServerMembers[i].JoinedAt;
            memberObj.avatar = getUserAvatar(ServerMembers[i].User.ID, ServerMembers[i].User.Avatar);
//             memberObj.user.ID = ServerMembers[i].User.ID;
            memberObj.userName = ServerMembers[i].User.Username;
            memberObj.discriminator = ServerMembers[i].User.Discriminator;
            memberObj.roles = ServerMembers[i].Roles.slice(0);
            membersObj[userID] = memberObj;
    }    
    server_members_db["membersInfo"] = JSON.stringify(membersObj);
}

function getServerMemberData(userID){
    use server_members_db;  
    var memberObj = getMemberObj();
    var userObj = getUserOBJ(userID);
    memberObj.joinedAt = userObj.JoinedAt;
    memberObj.avatar = getUserAvatar(userObj.User.ID, userObj.User.Avatar);
    memberObj.userName = userObj.User.Username;
    memberObj.discriminator = userObj.User.Discriminator;
    memberObj.roles = userObj.Roles.slice(0);
    return memberObj;
}

function getCleanedRestoreRolesArr(arrRoles){
        var arr = []
        for (var i = 0; i < arrRoles.length; i++){
                if (getRolePosition(arrRoles[i]))  //can add here and not a staff role.
                       arr.push(arrRoles[i]);
        }
        return arr;
}

function getRestoreChain2Roles(arr){
        use temp_db;
        var output = "{role}" + arr.shift() + ", " + arr.shift() + ", " + "Basic{/role}"
        if (arr.length == 0)
                delete temp_db[UserID];      
        else temp_db[UserID] = JSON.stringify(arr);
        dbg(output);
        return output;
}

function getRestoreRolesChain(num){
        use temp_db;
        var link = "{ars:C-restoreRoles" + num + "}"
        var output = "";
        var arr = [];
        if (temp_db[UserID] != undefined){
            arr = JSON.stringify(temp_db[UserID]);
            dbg(arr);
            resp = link + getRestoreChain2Roles(arr);
        }
}

