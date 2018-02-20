function getRolesEmbed(roles){
	
      var roleList, takeList, notesList, errList;
      var polyglot = roles.polyglot;
      if (roles.giveMsgStr == "") roleList = "NaN"; else roleList = roles.giveMsgStr;
      if (roles.takeMsgStr == "") takeList = "NaN"; else takeList = roles.takeMsgStr;
      
      if (roles.notesMsgStr == "") {
	      if (roles.errMsgStr == "")
		      notesList = "Completed Successfully.";
	      else
		      notesList = "Some errors.";      
      } else notesList = roles.notesMsgStr;
	
      if (roles.errMsgStr == "") errList = ""; else errList = "\
          {field[4]|name:Errors} \
          {field[4]|value:" + roles.errMsgStr + "} \
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
          {field[0]|name:Given} \
          {field[0]|value:"+ roleList + "}  \
          {field[0]|inline:false} \
          {field[1]|name:Taken} \
          {field[1]|value:" + takeList + "} \
          {field[1]|inline:fase} \
          {field[2]|name:Polyglot} \
          {field[2]|value:" + polyglot + "} \
          {field[2]|inline:fase} \
          {field[3]|name:Notes} \
          {field[3]|value:" + notesList + "} \
          {field[3]|inline:false} \
 	  " + errList + " \
          ";

      return  getExpandableEmbed(title, "", color, thumb, description, fields, "", "");     
}
