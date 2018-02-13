import "https://raw.githubusercontent.com/deepspace221/echo/master/functions/help_messages_functions.js";
//Count
function getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer, username){
   // if (UserID != "" && UserID != undefined && UserImage != "" && UserImage != undefined){
   //     var avatar = "https://discordapp.com/api/v6/users/" + UserID + "/avatars/" + UserImage + ".jpg";  
   // }

   var authorName = ServerMembers[138].User.Username;
   var authorIcon = "{usericon}";
   var Username = "a {/user\} g";
   var userIcon = "{usericon}";
   if (Trigger == "E-levent"){
//          var userOBJ = findUserImageAndUsernameByUserID(UserID);
            Username = username;
//          var userIcon = userOBJ.avatar;   
   }
   
    var defaultFooterIcon = "http://www.mahditajik.ir/wp-content/uploads/2016/07/com.memrise.android.memrisecompanion-1.png";
    var footer1 = "{footer|icon:" + defaultFooterIcon + "} {footer|text:" + footer +"}";
    var footer2 = "{footer|icon:" + footerIcon + "} {footer|text:" + footer + "}";

    if (author) author = "{author|icon:" + authorIcon + "}{author|name:"+ Username +"}"; else author = "";
    var randomColors = "{randlist:#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226,#26e2c0,#2633e2,#8126e2}";
    
    if (thumb == "user") thumb = "{thumb|url:"+ userIcon +"}";
    else if (thumb == "server") thumb = "{thumb|url:{guild|icon}}";
    else if (thumb) thumb = "{thumb|url:"+ thumb +"}";
    else if (!thumb) thumb = "";
   
    if (fields == "") fields = "";
    if (!color) color = randomColors;
    
    if (footer){
        if (footerIcon == "") footer = footer1;
        if (footerIcon != "") footer = footer2;
    }
    else footer = "";
   
    var embed = "{embed: \
                     {title:" + title +"} \
                     {type: rich} \
                     " + author + " \
                     {color:"+ color +"} \
                      " + thumb + " \
                    {desc: \
               " + description + " \
                      } \
                " + fields + " \
                " + footer + " \
             }";
    return embed;
}

function getSimpleEmbed(title, color, thumb, description){
    if (!color) color = "{randlist:#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226,#26e2c0,#2633e2,#8126e2}"; 
    
   
    if (thumb == "user") thumb = "{thumb|url:{usericon}}";
    else if (thumb == "server") thumb = "{thumb|url:{guild|icon}}";
    else if (thumb) thumb = "{thumb|url:"+ thumb +"}";
    else if (!thumb) thumb = "";

    var embed = "{embed: \
                     {title:" + title +"} \
                     {type: rich} \
                     {color:"+ color +"} \
                     "+ thumb +" \
                    {desc: \
               " + description + " \
                      } \
             }";
    return embed;
}

function getEmbed(type){
      if (type == "daily"){
         
      }  
      else if (type == "monthly"){
         
      }
      else if (type == "help"){
         return getHelpEmbed();                        
      }
      else if (type == "views"){
         return getViewsEmbed();
      }
}


function getHelpEmbed(){
      var icon1 = ":point_right:";
      var icon2 = ":diamond_shape_with_a_dot_inside:";

      var title = "Command examples for {guild|name}";
//       var username = "\{user\}";
      var username = "<@" + UserID + ">";
      var author = "false";
      var thumb = "server";
      var color = "";
      var footerIcon = "";
      var footer = "";
   
      var description = " \
      \nHello, " + username + "! <:cc:337623208243101698> \
      \n \
      \nAccess to features in the this server is dependent upon the roles you have. \
      \n \
      \nPlease make sure to tag yourself properly so you'll have access to all the features this server has to offer. \
      ";

      var fields = " \
      {field[0]|name:Select language <:blank:352901517004636163>} \
      {field[0]|value:\
```css\
\n.iam n. english\
\n.iam f. spanish\
\n.iam german\
```}\
      {field[0]|inline:true} \
      {field[1]|name:Description <:blank:352901517004636163>} \
      {field[1]|value:\
```fix\
\nFor native\
\nFor fluent\
\nFor learning\
```} \
      {field[1]|inline:true} \
      {field[2]|name:Memrise <:blank:352901517004636163>} \
      {field[2]|value: \
```css\
\n.iam memrise\
\n.iam memrise lvl 13 \
```} \
      {field[2]|inline:true} \
      {field[3]|name: <:blank:352901517004636163>} \
      {field[3]|value:\
```fix\
\nFor Memrise users \
\nBetween 10-15\
```} \
      {field[3]|inline:true} \
      {field[4]|name: Duolingo<:blank:352901517004636163>} \
      {field[4]|value:\
```css\
\n.iam duolingo\
\n.iam 4 trees completed\
\n.iam 2 trees lvl 25\
```}\
      {field[4]|inline:true}\
      {field[5]|name: <:blank:352901517004636163>}\
      {field[5]|value:\
```fix\
\nFor Duolingo users\
\nBetween 1-5\
\nBetween 1-3\
```} \
      {field[5]|inline:true}\
      {field[6]|name:Misc <:blank:352901517004636163>}\
      {field[6]|value:\
```css\
\n.iam polyglot \
\n.iam linguistics\
\n.iam translator\
\n.iam IPA\
\n.iam NSFW\
```}\
      {field[6]|inline:true}\
      \n\
      {field[7]|name: <:blank:352901517004636163>}\
      {field[7]|value:\
```fix\
\nFluent in 4 or above\
\nFor linguists\
\nFor translators\
\nFor IPA literate\
\nAge 18+\
```}\
      {field[7]|inline:true}\
      {field[8]|name:Removing a role <:blank:352901517004636163>}\
      {field[8]|value:\
\n"+ icon1 +" To **remove** a role replace `.iam` with `.iamnot`.\
}\
      {field[8]|inline:false}\
      {field[9]|name:Additional information}\
      {field[9]|value:\
\n"+ icon2 +" Type: `\\misc` for information on other roles on the server.\
\n"+ icon2 +" Type: `\\lang` to view a full list of available languages.\
\n"+ icon2 +" Type: `\\views` to view a list of aviliable view options.\
\n"+ icon2 +" Type `\\platform` to view a full list of available platforms.\
\n"+ icon2 +" Type: `\\cmd` to view a list of additional help commands.\
\n}\
      {field[9]|inline:false}\
      ";
   
      return  getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer);  
}
