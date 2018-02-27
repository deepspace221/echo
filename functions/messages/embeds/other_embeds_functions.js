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
      var polyglot = (polyglot.indexOf("true") != -1) ? polyglot + " <a:pikachudance:416433830694486028>" : polyglot;
  
      if (roles.giveMsgStr == "") roleList = "NaN"; else roleList = roles.giveMsgStr;
      if (roles.takeMsgStr == "") takeList = "NaN"; else takeList = roles.takeMsgStr;
      
      if (roles.notesMsgStr == "") {
	      if (roles.errMsgStr == "")
		      notesList = "Success!! <a:partyblob9:416433384429191174>";
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
      var description = "Here is a quick overview of what we have done.";
      var footIcon = "";
      var footer = "";
      var fields = "";
      
    var fields = " \
          {field[0]|name:<:check:314349398811475968> Given} \
          {field[0]|value:"+ roleList + "}  \
          {field[0]|inline:false} \
          {field[1]|name:<:xmark:314349398824058880> Taken} \
          {field[1]|value:" + takeList + "} \
          {field[1]|inline:false} \
          {field[2]|name:<:empty:314349398723264512> Polyglot} \
          {field[2]|value:" + polyglot + "} \
          {field[2]|inline:true} \
          {field[3]|name:<:empty:314349398723264512> Notes} \
          {field[3]|value:" + notesList + "} \
          {field[3]|inline:true} \
 	  " + errList + " \
          ";

      return getExpandableEmbed(title, "", color, thumb, description, fields, "", "");     
}

function getServerMapEmbed(channelsObj){ 
     var emb = getEmbedObj(), len = 0;
     emb.title = "Teleporter";
     emb.description = "Choose a location to teleport.";

     len = channelsObj.lang.length;
     dbg(len);
     emb.fields = getFieldsObj(len, false);
	
     for (var i = 0; i < channelsObj.lang.length; i++){
	emb.fields[i].name = channelsObj.lang[i].category;
	var channels = createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.lang[i].channels));
	emb.fields[i].value = (channels) ? channels : "NaN";
     }
     return emb;
      
//      emb.fields[1].name = "Admins";
//      emb.fields[1].value = (output.ademins) ? output.admins : "<:terrified:402081920063635467>";
//      emb.fields[1].inline = true;
      
//      emb.fields[2].name = "Bot Dev";
//      emb.fields[2].value = (output.botDev) ? output.botDev : "<:terrified:402081920063635467>";
//      emb.fields[2].inline = true;  
   
//      emb.fields[3].name = "Senior Mods";
//      emb.fields[3].value = (output.seniorMods) ? output.seniorMods : "<:terrified:402081920063635467>";
//      emb.fields[3].inline = true;
	
// 	dbg(emb);
	dbg(channelsObj);
	
	function convertArrChannelIDtoChannelName(arr){
// 		dbg(arr);
		for (var i = 0; i < arr.length; i++){
			if (arr[i])
			     arr[i] = arr[i].channelIDtoLink();	
		}
		return arr;
	}
}
