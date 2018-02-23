function dbg(content){
   webhook_url = "https://discordapp.com/api/webhooks/412072411333263360/xdl1PAHXJ3rQowr0VwRG1a5EnavbyoKoZjeOZ4TGE71IEVjfBNFJO1HBh_RSTILT553Q";
   if(content == "" || content == undefined){
     content = "Nothing passed into content" 
   } 
   else if (typeof content == "object"){
      content = "{ value: " + JSON.stringify(content) + "}";  
   }
   
   if(content.length > 1950){
     content = "https://www.hastebin.com/" + JSON.parse(PostJSON("https://www.hastebin.com/documents", "", true, content)).key + ".js";
   } 
   else {
     content = "```js\n" + content + "\n```";
   }
   PostJSON(webhook_url, "", false, {content: content});
} 
