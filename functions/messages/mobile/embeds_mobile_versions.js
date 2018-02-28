
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

     dbg(arrTxt);
     var hasMobileRole = (isMemberHasRole2("v. Mobile")) ? true : false;
     var hasHooksRole = (isMemberHasRole2("v. Hooks")) ? true : false;
	
     arrTxt.push(**"Teleporter"**);

     langCategories();
     if (hasMobileRole) {
	arrTxt.push(fieldName.mobile.bold());
	arrTxt.push(createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.mobile)));     
     }
     if (channelsObj.platforms != "") {
	arrTxt.push(fieldName.platforms.bold());
	arrTxt.push(createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.platforms)));  	     
     }
     dbg(arrTxt);
     arrTxt.push(fieldName.general.bold());
     arrTxt.push(createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.general))); 
     arrTxt.push(fieldName.community.bold());
     dbg(arrTxt);	
     arrTxt.push(createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.community))); 
     arrTxt.push(fieldName.languages.bold());
     arrTxt.push(createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.languages)));
     dbg(arrTxt);
     if (hasHooksRole) {
	     arrTxt.push(fieldName.hooks.bold());
	     arrTxt.push(createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.hooks)));	     
     }
     dbg(arrTxt);	
     if (channelsObj.hobbies != "") {
	     arrTxt.push(fieldName.hobbies.bold());
	     arrTxt.push(createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.hobbies)));			     
     }
	
     dbg(arrTxt);
     return createArrOutputNewLinesSeprated(arrTxt);

  function langCategories(){     
        for (var i = 0; i < channelsObj.lang.length; i++){
          arrTxt.push(channelsObj.lang[i].categoryName.bold());
          arrTxt.push(createArrOutputNewLinesSeprated(convertArrChannelIDtoChannelName(channelsObj.lang[i].channels)));
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
