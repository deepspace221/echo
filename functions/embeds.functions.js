
//Count
function getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer){
    var avatar = "https://discordapp.com/api/v6/users/" + UserID + "/avatars/" + UserImage + ".jpg";  
    var defaultFooterIcon = "http://www.mahditajik.ir/wp-content/uploads/2016/07/com.memrise.android.memrisecompanion-1.png";
    var footer1 = "{footer|icon:" + defaultFooterIcon + "} {footer|text:" + footer +"}";
    var footer2 = "{footer|icon:" + footerIcon + "} {footer|text:" + footer + "}";

    if (author) author = "{author|icon:{usericon}}{author|name:{user}}"; else author = "";
    var randomColors = "{randlist:#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226,#26e2c0,#2633e2,#8126e2}";
    
    if (!thumb || thumb === true) thumb = "{thumb|url:{guild|icon}}";
    else if (thumb == "false") thumb = "";
    else if (thumb == "user") thumb = "{thumb|url:"+ avatar +"}";
    else thumb = "{thumb|url:"+ thumb +"}";
    
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

function getSimpleEmbed(title, thumb, description){
    if (!color) color = "{randlist:#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226,#26e2c0,#2633e2,#8126e2}"; 
    
    if (!thumb || thumb === true) thumb = "{thumb|url:{guild|icon}}";
    else if (thumb === "false") thumb = "";
    else if (thumb == "user") thumb = "{thumb|url:{usericon}}";
    else thumb = "{thumb|url:"+ thumb +"}";

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

