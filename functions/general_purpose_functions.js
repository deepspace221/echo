
function debug(content){
  webhook_url = A_VALID_DISCORD_WEBHOOK_URL
  if(content === ""){
    content = "Nothing passed into content" 
  } else if(content.length > 1950 || (typeof content !== "string" && typeof content !== "number")){
    content = "https://www.hastebin.com/" + JSON.parse(PostJSON("https://www.hastebin.com/documents", "", true, content)).key + ".js" 
  } else {
    content = "```js\n" + content + "\n```" 
  }
  PostJSON(webhook_url, "", false, {content: content})
} 
