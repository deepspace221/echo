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
     var emb = getEmbedObj(), idx = 0;
     var hasMobileRole = (isMemberHasRole2("v. Mobile")) ? true : false;
     var hasHooksRole = (isMemberHasRole2("v. Hooks")) ? true : false;
	
     emb.title = "Teleporter";
     emb.description = "Choose a location to teleport.";
//      emb.thumbnail.url = getGuildIcon();

     emb.fields = getFieldsObj(getFieldsLength(), true);

     runCreateFields();
	
     dbg(emb);
     return emb;

     function createFields(type, name){     
	if (type == "community" || type == "general" || type == "lang"){
		var value = (channelsObj.main[type]) ? createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.main[type])) : "NaN";
		emb.fields[idx].name = name;
		emb.fields[idx].value = value;
		idx++;		
	}
	else if (type == "langCategories"){
		for (var i = 0; i < channelsObj.lang.length; i++){
			emb.fields[idx].name = channelsObj.lang[i].categoryName;
			emb.fields[idx].value = createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.lang[i].channels));
			idx++;
			// 	for 2 columns		if ((i == channelsObj.lang.length -1) && (i % 2 == 0)) 	emb.fields[idx].inline = false; 
   		}
	}
	else if (type == "mobile" || type == "platforms"){
		var value = (channelsObj[type] != "") ? createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj[type])) : "NaN";
		emb.fields[idx].name = name;
		emb.fields[idx].value = value;
		idx++;		
		// for 2 columns		if ((!hasMobileRole || channelsObj.platforms == "") && (type == "platforms" || type == "mobile")) emb.fields[idx].inline = false;
	}
	else if (type == "hobbies" || type == "hooks"){
		var value = (channelsObj[type] != "") ? createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj[type])) : "NaN";
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
     function createEmptyFields(emb, num, idx){
	   idx = (idx) ? idx : 0;
	   dbg("index :" + idx + "\nnum :" + num);
	   if (num == 2){
		emb.fields[idx+1].name = "<:blank:352901517004636163>";
		emb.fields[idx+1].value = "<:blank:352901517004636163>";
		emb.fields[idx+2].name = "<:blank:352901517004636163>";
		emb.fields[idx+2].value = "<:blank:352901517004636163>";
		idx += 2;	   
	   }
	   else if (num == 1){
		emb.fields[idx+1].name = "<:blank:352901517004636163>";
		emb.fields[idx+1].value = "<:blank:352901517004636163>";
		idx++;	   
	   }	     
     }
	
     function getFieldsLength(){
	     var len = 0;
             if (hasMobileRole || channelsObj.platforms != "") len += 3;

	     len += channelsObj.lang.length;
	     if (channelsObj.lang.length % 3 == 1) len += 2;
	     else if (channelsObj.lang.length % 3 == 2) len++;

	     len += Object.keys(channelsObj.main).length;

	//      if (hasMobileRole) len++;
	//      if (channelsObj.platforms != "") len++;
	//      if (hasMobileRole && channelsObj.platforms != "") len++

	     if (hasHooksRole) len++;
	     if (channelsObj.hobbies != "") len++;

	     if (len % 3 == 1) len += 2;
	     else if (len % 3 == 2) len++;

	     dbg("final " + len); 	
	     return len;
     }
	
     function runCreateFields(){
	     if (hasMobileRole) createFields("mobile", ":signal_strength: Mobile");
	     if (channelsObj.platforms != "") createFields("platforms", "<:duolingo12:402265833541206027> Platforms");
	     if (hasMobileRole && channelsObj.platforms != "")
		     createEmptyFields(emb, 2, idx);		
	     else if (hasMobileRole || channelsObj.platforms != "") 
		     createEmptyFields(emb, 1, idx);

	     createFields("langCategories");
	     if (channelsObj.lang.length % 3 == 1) createEmptyFields(emb, 2, idx);
	     else if (channelsObj.lang.length % 3 == 2) createEmptyFields(emb, 1, idx);

	     createFields("general", ":regional_indicator_g:eneral");
	     createFields("community", "<:gringo:402274676153516033> Community");
	     createFields("lang", ":earth_asia: Languages");

	     if (hasHooksRole) createFields("hooks", "<:youtube:314349922885566475> Hooks");
	     if (channelsObj.hobbies != "") createFields("hobbies", "<:cute_bunny:402265976592400394> Hobbies");	 
	     if (hasHooksRole && channelsObj.hobbies != "") 
		     createEmptyFields(emb, 2, idx);		 
	     else if (hasHooksRole || hannelsObj.hobbies != "")
		     createEmptyFields(emb, 1, idx);	     
     }
}
