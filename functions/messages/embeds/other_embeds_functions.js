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
	
     var fieldName = {
	     platforms: "<:duolingo:352946192176513026> Platforms",
	     community: ":regional_indicator_c:ommunity", //<:gringo:402274676153516033> 
	     languages: ":regional_indicator_l:anguages", //:earth_asia:
	     general: ":regional_indicator_g:eneral",
	     hobbies: "<:cute_bunny:402265976592400394> Misc",
	     hooks: "<:youtube:314349922885566475> Hooks",
	     mobile: ":signal_strength: Mobile"
     };
	
     var hasMobileRole = (isMemberHasRole2("v. Mobile")) ? true : false;
     var hasHooksRole = (isMemberHasRole2("v. Hooks")) ? true : false;
	
     emb.title = "Teleporter";
     emb.description = "Choose a location to teleport.";
//      emb.thumbnail.url = getGuildIcon();

     emb.fields = getFieldsObj(getFieldsLength(), true);

     runCreateFields();
	
//      dbg(emb);
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
		        if (/irish/i.test(channelsObj.lang[i].categoryName))
				emb.fields[idx].name = ":flag_ie: Irish | :flag_gb: gaelic";
			else emb.fields[idx].name = channelsObj.lang[i].categoryName;
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
     function createEmptyFields(num){
// 	   dbg("index :" + idx + "\nnum :" + num);
	   if (num == 2){
		emb.fields[idx].name = "<:blank:352901517004636163>";
		emb.fields[idx].value = "<:blank:352901517004636163>";
		emb.fields[idx+1].name = "<:blank:352901517004636163>";
		emb.fields[idx+1].value = "<:blank:352901517004636163>";
		idx += 2;	   
	   }
	   else if (num == 1){
		emb.fields[idx].name = "<:blank:352901517004636163>";
		emb.fields[idx].value = "<:blank:352901517004636163>";
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

// 	     dbg("final " + len); 	
	     return len;
     }
	
     function runCreateFields(){

	     createFields("langCategories");
	     if (channelsObj.lang.length % 3 == 1) createEmptyFields(2);
	     else if (channelsObj.lang.length % 3 == 2) createEmptyFields(1);
	     
	     if (hasMobileRole) createFields("mobile", fieldName.mobile);
	     if (channelsObj.platforms != "") createFields("platforms", fieldName.platforms);
	     if (hasMobileRole && channelsObj.platforms != "")
		     createEmptyFields(1);		
	     else if (hasMobileRole || channelsObj.platforms != "") 
		     createEmptyFields(2);

	     createFields("general", fieldName.general);
	     createFields("community", fieldName.community);
	     createFields("lang", fieldName.languages);

	     if (hasHooksRole) createFields("hooks", fieldName.hooks);
	     if (channelsObj.hobbies != "") createFields("hobbies", fieldName.hobbies);	 
	     if (hasHooksRole && channelsObj.hobbies != "") 
		     createEmptyFields(1);		 
	     else if (hasHooksRole || channelsObj.hobbies != "")
		     createEmptyFields(2);	     
     }
}

function getInRoleEmbed(arrUsers, role){
     use server_db;
     var emb, pagesNum = 1, reacts, sleep = "", page = 0;
     emb = getEmbedObj(), reacts = "";
     emb.title = "Users in the role - " + role;
     emb.description = "We have **" + arrUsers.length + "** users in the role **" + role + "**.";  
     emb = getInRolePage(emb, arrUsers, 0);	     
     
     if (arrUsers.length % 40  == 0)
	     pagesNum = (arrUsers.length / 40);
     else pagesNum += Math.floor(arrUsers.length / 40);
	
	dbg("length " + arrUsers.length + "\n division: " + arrUsers.length / 40);
     emb.footer.text = "Page " + (page + 1) + "/" + pagesNum;	
	
     if (arrUsers.length > 40){
	reacts = "{reactbot:◀ ▶}"       
	var inRole = {
		page: 0,
		pagesNum: pagesNum,
		arrUsers: arrUsers,
		emb: emb,
		reacts: reacts
	};     
	server_db["inRole"] = JSON.stringify(inRole); 
	sleep = "{sleep}{time:5m}{d?server_db:inRole}{/sleep}"
     }
     return getJSEmbedToArs(emb) + reacts + sleep;
}

function getInRoleNextPreviousPage(type){
	use server_db;
	var emb, arrUsers, page, reacts, pagesNum;
	
	if (server_db.hasOwnProperty("inRole")){
		inRole = JSON.parse(server_db["inRole"]);
		
		if (type == "next" && (inRole.page + 1 <= inRole.pagesNum)){
			inRole.page++;
			emb = getInRolePage(inRole.emb, inRole.arrUsers, inRole.page);
		}
		else if (type == "previous" && (inRole.page -1 >= 0)){
			inRole.page--;
			emb = getInRolePage(inRole.emb, inRole.arrUsers, inRole.page);			
		}
		
		server_db["inRole"] = JSON.stringify(inRole); 

		return getJSEmbedToArs(emb) + inRole.reacts;
	}
}

function getInRolePage(emb, arrUsers, page){
     var pagesNum = 1;	
     var arr = arrUsers.splice(page * 20, (arrUsers.length >= (page+1)*40) ? (page+1)*40 : arrUsers.length);
     if (arr.length <= 20){	
    	 emb.fields = getFieldsObj(1, true);
	 emb.fields[0].name = "Users";
	 emb.fields[0].value = createArrOutputNewLinesSeprated(arr);
     }
     else {
	 emb.fields = getFieldsObj(2, true);
	 emb.fields[0].name = "Users<:blank:352901517004636163>";
	 emb.fields[0].value = createArrOutputNewLinesSeprated(arr.splice(0,20));	    
	 emb.fields[1].name = "<:blank:352901517004636163>";
	 emb.fields[1].value = createArrOutputNewLinesSeprated(arr);	    	     
     }	
     return emb;
}
