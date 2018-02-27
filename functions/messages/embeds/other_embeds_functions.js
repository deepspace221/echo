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
     var emb = getEmbedObj(), len = 0, idx = 0;
     emb.title = "Teleporter";
     emb.description = "Choose a location to teleport.";
     emb.thumbnail.url = getGuildIcon();

     len = channelsObj.lang.length;
     len += Object.keys(channelsObj.main).length;
     len += Object.keys(channelsObj).length -2;	

     dbg(len);
     emb.fields = getFieldsObj(len, true);

	
     createFields("mobile");
     createFields("platforms");
     createFields("langCategories");
     createFields("community");
     createFields("general");
     createFields("lang");
     createFields("hobbies");	
     createFields("hooks");
	
     dbg(emb);
     return emb;

     function createFields(type){     
	if (type == "community" || type == "general" || type == "hooks" || type == "lang"){
		var name = (type) ? type : "NaN";
		var value = (channelsObj.main[type]) ? createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.main[type])) : "NaN";
		emb.fields[idx].name = type;
		emb.fields[idx].value = value;
		idx++;		
	}
	else if (type == "langCategories"){

		for (var i = 0; i < channelsObj.lang.length; i++){
			emb.fields[idx].name = channelsObj.lang[i].categoryName;
			emb.fields[idx].value = createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.lang[i].channels));
			idx++;
   		}
	}
	else if (type == "hobbies" || type == "mobile" || type == "platforms"){
		var name = (type) ? type : "NaN";
		var value = (channelsObj[type]) ? createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj[type])) : "NaN";
		emb.fields[idx].name = name;
		emb.fields[idx].value = value;
		idx++;		
	}
     }

     function convertArrChannelIDtoChannelName(arr){
	for (var i = 0; i < arr.length; i++){
		if (arr[i])
		     arr[i] = arr[i].channelIDtoLink();	
	}
	return arr;
     }
}
