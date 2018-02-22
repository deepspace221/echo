function getBasicRoleEmbed(roles){
	
	var description = "", color = "";
	
	if (roles.lastElement.type == "give") {description = "<@" + UserID + "> I have given you the role **" + roles.lastElement.role + "**."; color = "#00ee0b";}
	if (roles.lastElement.type == "take") {description = "<@" + UserID + "> I have taken from you the role **" + roles.lastElement.role + "**."; color = "#f0e102";}
	if (roles.errMsgStr != "") {description = "<@" + UserID + "> " + roles.errMsgStr; color = "#f70508"};
	
	return getBasicEmbed(color, description);
}
function getRolesEmbed(roles){
	
      var roleList, takeList, notesList, errList;
      var polyglot = roles.polyglot;
      if (roles.giveMsgStr == "") roleList = "NaN"; else roleList = roles.giveMsgStr;
      if (roles.takeMsgStr == "") takeList = "NaN"; else takeList = roles.takeMsgStr;
      
      if (roles.notesMsgStr == "") {
	      if (roles.errMsgStr == "")
		      notesList = "Success!!";
	      else
		      notesList = "Some errors.";      
      } else notesList = roles.notesMsgStr;
	
      if (roles.errMsgStr == "") errList = ""; else errList = "\
          {field[4]|name:<a:typing:393848431413559296> Errors} \
          {field[4]|value:" + roles.errMsgStr + "} \
          {field[4]|inline:false} \
      ";
  
      var title = "ROLES TOGGLE INFO";
      var color = "#ffffff";
      var thumb = "";
      var description = "Here is a quick overview of what we have done. <:blobl8:416371480742330378>";
      var footIcon = "";
      var footer = "";
      var fields = "";
      
    var fields = " \
          {field[0]|name:  Given} \
          {field[0]|value:"+ roleList + "}  \
          {field[0]|inline:false} \
          {field[1]|name:<:xmark:314349398824058880> Taken} \
          {field[1]|value:" + takeList + "} \
          {field[1]|inline:false} \
          {field[2]|name:<:hypesquad:314068430854684672> Polyglot} \
          {field[2]|value:" + polyglot + "} \
          {field[2]|inline:false} \
          {field[3]|name:<:empty:314349398723264512> Notes} \
          {field[3]|value:" + notesList + "} \
          {field[3]|inline:false} \
 	  " + errList + " \
          ";

      return getExpandableEmbed(title, "", color, thumb, description, fields, "", "");     
}
