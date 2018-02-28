
function getMobileServerMapEmbed(channelsObj){ 
     var arrTxt = [];
	
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
	
     arrTxt.push(**"Teleporter"**);
     
     runCreateFields();

     dbg(arrTxt);
     return createArrOutputNewLinesSeprated(arrTxt);

  function createFields(type, name){     
      if (type == "community" || type == "general" || type == "lang"){
        var value = (channelsObj.main[type]) ? createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.main[type])) : "NaN";
        arrTxt.push(name.bold());
        arrTxt.push(value);	
      }
      else if (type == "langCategories"){
        for (var i = 0; i < channelsObj.lang.length; i++){
          arrTxt.push(channelsObj.lang[i].categoryName.bold());
          arrTxt.push(createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.lang[i].channels)));
          }
      }
      else if (type == "mobile" || type == "platforms"){
        var value = (channelsObj[type] != "") ? createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj[type])) : "NaN";
        arrTxt.push(name.bold());
        arrTxt.push(value);
      }
      else if (type == "hobbies" || type == "hooks"){
        var value = (channelsObj[type] != "") ? createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj[type])) : "NaN";
        arrTxt.push(name.bold());
        arrTxt.push(value);
      }
 }

    function convertArrChannelIDtoChannelName(arr){
      for (var i = 0; i < arr.length; i++){
        if (arr[i])
             arr[i] = arr[i].channelIDtoLink();	
      }
      return arr;
    }
   function runCreateFields(){
	     createFields("langCategories");
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
