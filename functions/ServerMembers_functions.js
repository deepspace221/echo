function getMemberIndex() { //WORKING
    var memberIndex = 0;

    for (i = 0; i < ServerMembers.length; i++) {
        if (ServerMembers[i].User.ID == UserID) {
            memberIndex = i;
            break;
        }
    }
    return memberIndex;
}

function getUserRolesArr(memberIndex) {
    var roles = [];
    for (x = 0; x < ServerMembers[memberIndex].Roles.length; x++) {
            roles.push(GetRoleName(ServerMembers[memberIndex].Roles[x]));
    }
    return roles;
}
// function getUserRolesOBJ(memberIndex){
//     var user = {};
//     var role = "";
//     for (x = 0; x < ServerMembers[memberIndex].Roles.length; x++) {
//             role = GetRoleName(ServerMembers[memberIndex].Roles[x]).replace("[\s.]", "");
//             user[role] = icon.positive;
//     }
//     return user;
// }
