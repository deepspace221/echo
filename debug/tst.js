import "https://raw.githubusercontent.com/deepspace221/echo/master/functions/embeds.functions.js";
import "https://raw.githubusercontent.com/deepspace221/echo/master/functions/general_purpose_functions.js";
var color = GetJSON("https://raw.githubusercontent.com/deepspace221/echo/master/json/css-color-names.json");
var redirect = "{redirect:383789043248267264}";
var title = "Member Left";
var description = "{user} has left the server!";
var footer = "Current members count: " + getMembersCount("users");
var color = color.red; 
resp = redirect + getExpandableEmbed(title, true, color, "user", description, '' , '' , footer);
