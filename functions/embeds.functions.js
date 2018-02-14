//Count
function getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer, username){
   // if (UserID != "" && UserID != undefined && UserImage != "" && UserImage != undefined){
   //     var avatar = "https://discordapp.com/api/v6/users/" + UserID + "/avatars/" + UserImage + ".jpg";  
   // }
   userOBJ = getUserOBJ("trailblazer");
   var authorName = userOBJ.User.Username;
   var authorIcon = userOBJ.userImage;
   var Username = "{/user\}";
   var userIcon = "{usericon}";
   if (Trigger == "E-levent"){
//          var userOBJ = findUserImageAndUsernameByUserID(UserID);
            Username = username;
//          var userIcon = userOBJ.avatar;   
   }
   
    var defaultFooterIcon = "http://www.mahditajik.ir/wp-content/uploads/2016/07/com.memrise.android.memrisecompanion-1.png";
    var footer1 = "{footer|icon:" + defaultFooterIcon + "} {footer|text:" + footer +"}";
    var footer2 = "{footer|icon:" + footerIcon + "} {footer|text:" + footer + "}";

    if (author) author = "{author|icon:" + authorIcon + "}{author|name:"+ authorName +"}"; else author = "";
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
   
   
switch (type) {
      case "daily":
      case "monthly":
           break; 
      case "views":
           getViewsEmbed();
           break;
      case "help":
           getHelpEmbed();
           break;   
       case "platform":
           getPlatformEmbed();
           break;        
       case "welcome help":
           getWelcomeHelpEmbed();
           break;                
      case "misc":
           getMiscEmbed();
           break;         
       case "server":
           getServerMsg();
           break;        
       case "welcome help":
           getWelcomeHelpEmbed();
           break;
       case "languages":
           getLanguagesEmbed();
           break;         
      case "bots quick info":
           getBotsQuickInfo();
           break;         
       case "echo quick info":
           getEchoQuickInfo();
           break;        
       case "ub3r help":
           getUB3RHelp();
           break;      
       case "nadeko help":
           getNadekoHelp();
           break;         
       case "mee6 help":
           getMee6Help();
           break;        
       case "tatsumaki help":
           getTatsumakiHelp();
           break;
      case "septapus help":
           getSeptapusHelp();
           break;         
       case "matbot help":
           getMatbotHelp();
           break;                       
       default:
          resp = "dd"
          break;           
    }  
}

