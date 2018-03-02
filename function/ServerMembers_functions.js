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
