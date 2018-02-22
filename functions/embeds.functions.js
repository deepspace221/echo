function getUserImage(){
       return "https://discordapp.com/api/v6/users/" + UserID + "/avatars/" + UserImage + ".jpg";
}

function getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer){
   // if (UserID != "" && UserID != undefined && UserImage != "" && UserImage != undefined){
   //     var avatar = "https://discordapp.com/api/v6/users/" + UserID + "/avatars/" + UserImage + ".jpg";  
   // }
        
//   var obj = {};
//    if (author == "trailblazer"){
//       obj = getUserOBJ("trailblazer");
//       authorName = obj.User.Username;
//       authorIcon = obj.User.userImage;
//    }
  
//    use server_members_db;
       
   var Username = "{/user}";
   var userIcon = "{usericon}";      
   var authorIcon;
   var authorName;
 
   if (Trigger == "E-levent"){   
       var userObj = JSON.parse(server_members_db["membersInfo"]);
       userIcon = (userObj[UserID].avatar) ? userObj[UserID].avatar : undefined;
       authorIcon = (userIcon) ? userIcon : undefined;
       authorName = (userObj[UserID].userName) ? userObj[UserID].userName : undefined;
   }
       
     if (!color) color = randomColors;
   
    if (author) author = "{author|icon:" + authorIcon + "}{author|name:"+ authorName +"}"; else author = "";
    var randomColors = "{randlist:#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226,#26e2c0,#2633e2,#8126e2}";
    
    if (thumb == "user") thumb = "{thumb|url:"+ userIcon +"}";
    else if (thumb == "server") thumb = "{thumb|url:{guild|icon}}";
    else if (thumb) thumb = "{thumb|url:"+ thumb +"}";
    else if (!thumb) thumb = "";
       
       
    var defaultFooterIcon = "http://www.mahditajik.ir/wp-content/uploads/2016/07/com.memrise.android.memrisecompanion-1.png";
    var footer1 = "{footer|icon:" + defaultFooterIcon + "} {footer|text:" + footer +"}";
    var footer2 = "{footer|icon:" + footerIcon + "} {footer|text:" + footer + "}";
       
     if (footer){
        if (footerIcon == "") footer = footer1;
        if (footerIcon != "") footer = footer2;
    }
    else footer = "";
   
    if (!fields) fields = "";
    

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

function getBasicEmbed(color, description){
       
    if (!color) color = "#ffffff";
           
    var embed = " \
        {embed: \
                 {type: rich} \
                 {color:"+ color +"} \
                {desc: \
           " + description + " \
                  } \
         } \
    ";
    return embed;
}



function getEmbed(type){
   switch (type) {
      case "daily":
      case "monthly":
           break; 
      case "views":
           return getViewsEmbed();
           break;
      case "help":
           return getHelpEmbed();
           break;   
       case "platform":
           return getPlatformEmbed();
           break;        
       case "welcome help":
           return getWelcomeHelpEmbed();
           break;                
      case "misc":
           return getMiscEmbed();
           break;         
       case "server":
           return getServerMsg();
           break;        
       case "welcome help":
           return getWelcomeHelpEmbed();
           break;
       case "languages":
           return getLanguagesEmbed();
           break;         
      case "bots quick info":
           return getBotsQuickInfo();
           break;         
       case "echo quick info":
           return getEchoQuickInfo();
           break;        
       case "ub3r help":
           return getUB3RHelp();
           break;      
       case "nadeko help":
           return getNadekoHelp();
           break;         
       case "mee6 help":
           return getMee6Help();
           break;        
       case "tatsumaki help":
           return getTatsumakiHelp();
           break;
      case "septapus help":
           return getSeptapusHelp();
           break;         
       case "matbot help":
           return getMatbotHelp();
           break;                       
       default:
           return false;
          break;           
    };
}
