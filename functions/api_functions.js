function getLangKey(lang, json){
          for (key in json) {
                var langName = new RegExp(lang, 'i')
                if (langName.test(json[key].name))
                  return key;
          }
          return "";
}
function getLangFlag(key, type, json){
            if (!type) type = "shiny"; 
            var arr =  json[key].countryCode.split(";");
            var rand = getRendom(arr.length);
            var result = "http://www.countryflags.io/" + arr[rand].trim() + "/" + type + "/64.png";
            return result;
}

function getWikiLink(key, json){
            var lang =  json[key].name.split(";")[0].trim();
            // var rand = getRendom(arr.length);

            return "[" + json[key].name.split(";")[0] +  " wiki](https://en.wikipedia.org/wiki/" + lang + "_language)";
}

function getLocations(roleName){
        var url = "http://countryapi.gear.host/v1/Country/getCountries?pNativeLanguage=ger";
        dbg(url);
        var json = GetJSON(url);
        dbg(json);
        var locations = "";
        for (var i=0; i < json.Response.length; i++){
              // if (i = json.Response.length -1){
              //                 locations +=  json.Response[i].NativeName;
              //                 break;
              // }
              locations += json.Response[i].NativeName + ", "; 
              dbg(locations);
        }
        dbg(locations);
        return (locations) ? locations : "NaN";
}

function getLangMetaData(roleName){
            var obj = {
                    nativeName: "",
                    wiki: "",
                    thumb: undefined,
                    locations: ""
            }
            var json = GetJSON("https://raw.githubusercontent.com/deepspace221/echo/master/json/languages.json");
            var key = getLangKey(roleName, json);
            dbg(key);
            if (key){
                      obj.nativeName = json[key].nativeName;
                      obj.wiki = getWikiLink(key, json);
                      obj.thumb = getLangFlag(key, "", json);
            }
           // obj.locations = getLocations(roleName);

           return obj;
}


