function getEmbedSingleRoleCount(roleName, roleCount){
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

function getEmbedSingleLangCount(roleName, counters, total, nativeName, wiki, locations){
    if (!nativeName) nativeName = "NaN"; 
    if (!wiki) wiki = "NaN";      
    if (!locations) locations = "NaN"; 

    var title = "Statistics for the "+ roleName + " language:";     
    var author= "";
    var thumb = "";
    var color = "";
    var footer = "";
    var footerIcon ="";
    var description = "Here is the information we have.";
        
    var fields = " \
                {field[1]|name:Native/Fluent/Learning} \
                {field[1]|value:"+ counters + "}  \
                {field[1]|inline:true} \
                {field[4]|name:Total} \
                {field[4]|value:" + total + "} \
                {field[4]|inline:true} \
                {field[5]|name:Native name} \
                {field[5]|value:" + nativeName + "} \
                {field[5]|inline:true} \
                {field[6]|name:Wiki} \
                {field[6]|value:" + wiki + "} \
                {field[6]|inline:true} \
                {field[7]|name:Spoken in} \
                {field[7]|value:" + locations + "} \
                {field[7]|inline:true} \
                ";
    
   return getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer);
}


