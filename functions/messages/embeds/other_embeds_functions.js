function getRolesEmbed(roles, outputOBJ){
	
      var roleList, takeList, notesList, errList;
      var polyglot = roles.polyglot;
      if (outputOBJ.giveMsgStr == "") roleList = "NaN"; else roleList = outputOBJ.giveMsgStr;
      if (outputOBJ.takeMsgStr == "") takeList = "NaN"; else takeList = outputOBJ.takeMsgStr;
      if (outputOBJ.notesMsgStr == "") notesList = "Completed Successfully"; else notesList = outputOBJ.notesMsgStr;
      if (outputOBJ.errMsgStr == "") errList = ""; else errList = "\
          {field[4]|name:Errors} \
          {field[4]|value:" + outputOBJ.errMsgStr + "} \
          {field[4]|inline:false} \
      ";
  
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
          {field[3]|name:Notes} \
          {field[3]|value:" + notesList + "} \
          {field[3]|inline:false} \
 	  " + errList + " \
          ";

      return  getExpandableEmbed(title, "", color, thumb, description, fields, "", "");     
}
