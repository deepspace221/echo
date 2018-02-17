function getSingleRoleCount(roleName, roleCount){
        var fields = "";
        var footer = "";
        var thumb = "";
        var footerIcon ="";
        var color = "";
        var author= "";
        title = "The number of "+ roleName + " users:";
        description = " \
                \nThe total number of users in role " + roleName +" is: " + roleCount +" \
                ";              
        return getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer);
}
