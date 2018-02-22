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

function initNewMember(index){
            var memberObj = getMemberObj();
            var userID = ServerMembers[i].User.ID;
            memberObj.joinedAt = ServerMembers[i].JoinedAt;
            memberObj.avatar = getUserAvatar(ServerMembers[i].User.ID, ServerMembers[i].User.Avatar);
//             memberObj.user.ID = ServerMembers[i].User.ID;
            memberObj.userName = ServerMembers[i].User.Username;
            memberObj.discriminator = ServerMembers[i].User.Discriminator;
            memberObj.roles = ServerMembers[i].Roles.slice(0);
            return memberObj;
}
