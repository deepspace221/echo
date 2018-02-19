function getRolesEmbed(roles){
      var roleList = "";
      var takeList = ""; 
      var polyglot = "false";
      var errMsg = "";
        
	for (var i = 0; i < roles.giveMsg.length; i++){
		if (i = roles.giveMsg.length - 1){
			roleList += roles.giveMsg[i];
		}		
	       roleList += roles.giveMsg[i] + ", ";
	}
	for (var i = 0; i < roles.takeMsg.length; i++){
		if (i = roles.takeMsg.length - 1){
			takeList += roles.takeMsg[i];
		}
	       takeList += roles.takeMsg[i] + ", ";
	}
	for (var i = 0; i < roles.errMsg.length; i++){
		if (i = roles.errMsg.length - 1){
			errMsg += roles.errMsg[i];
		}
		errMsg += roles.errMsg[i];
	}
	
      if (roleList == "") roleList = "NaN";
      if (takeList == "") takeList = "NaN";
      if (errMsg == "") errMsg = "Completed Successfully";
	
  
      var title = "ROLES TOGGLE INFO";
      var color = "#ffffff";
      var thumb = "";
      var description = "Here is a quick overview of what we have done.";
      var footIcon = "";
      var footer = "";
      var fields = "";
      
    var fields = " \
          {field[0]|name:Give} \
          {field[0]|value:"+ roleList + "}  \
          {field[0]|inline:true} \
          {field[1]|name:Take} \
          {field[1]|value:" + takeList + "} \
          {field[1]|inline:true} \
          {field[2]|name:Polyglot} \
          {field[2]|value:" + polyglot + "} \
          {field[2]|inline:true} \
          {field[3]|name:Errors} \
          {field[3]|value:" + errMsg + "} \
          {field[3]|inline:false} \
          ";

      return  getExpandableEmbed(title, "", color, thumb, description, fields, "", "");     
}
