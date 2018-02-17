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

function getEmbedSingleLangCount(roleName, counters, total, thumb, nativeName, wiki, locations){
    if (!nativeName) nativeName = "NaN"; 
    if (!wiki) wiki = "NaN";      
    if (!locations) locations = "NaN"; 
    if (!thumb) thumb = "";

    var title = "Statistics for the "+ roleName + " language:";     
    var author= "";
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

function getCountLangEmbed(output, userLimit, langsOBJ){
      var title = "Statistics for all languages";
      var author;
      var color;
      var thumb;
      var description = "General overview." + userLimit;
      var footerIcon;
      var footer = "Run: \\count lang [native|fluent|learning] [1-54] for additional view options.";
      var fields = "\
                {field[0]|name:Native (" + langsOBJ.nativeRolesCount + ")} \
                {field[0]|value:" + output.nativeField + "}  \
                {field[0]|inline:true} \
                {field[1]|name:Fluent (" + langsOBJ.fluentRolesCount +")} \
                {field[1]|value:" + output.fluentField  + "} \
                {field[1]|inline:true} \
                {field[2]|name:Learning (" + langsOBJ.learningRolesCount + ")} \
                {field[2]|value:" + output.learningField  + "} \
                {field[2]|inline:true} \
      ";    
      return getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer);                 
}

function getCountTopEmbed(output, userLimit){
         var title = "Top languages";
         var author;
         var color;
         var thumb;
         var description = "Totals of the **native**, **fluent** and **learning** roles put together!\nThe most popular languages." + userLimit; 
         var footerIcon;
         var footer  = "Run: \\count lang [1-54] for a general languages view."
         
         var fields = " \
            {field[0]|name:Language} \
            {field[0]|value:" + output["learningNames"] + "}  \
            {field[0]|inline:true} \
            {field[1]|name:Count} \
            {field[1]|value:" +  output["learningNum"]  + "} \
            {field[1]|inline:true} \
            ";     
        
        return getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer);      
}

function getCountTypeEmbed(output, type, userLimit, langsOBJ){
          var typeUC = type.charAt(0).toUpperCase() + type.toLowerCase().slice(1);
          var title = "Statistics for " + type +" languages";
          var author;
          var color;
          var thumb;
          var description = typeUC +" languages." + userLimit;
          var footer  = "Run: \\count lang [1-54] for a general languages view."
          var footerIcon;
        
          var field0Name = typeUC +" (" + langsOBJ[type + 'RolesCount'] + ")";
          var field0Value = output[type + "Names"];                              
          var field1Name = "Count";
          var field1Value = output[type + "Num"];  
          var fields = " \
                              {field[0]|name:" + field0Name + "} \
                              {field[0]|value:" + field0Value + "}  \
                              {field[0]|inline:true} \
                              {field[1]|name:" + field1Name +"} \
                              {field[1]|value:" + field1Value  + "} \
                              {field[1]|inline:true} \
                              ";    

       return getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer);         
}
