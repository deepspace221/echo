
//Count
function getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer){
    var defaultFooterIcon = "http://www.mahditajik.ir/wp-content/uploads/2016/07/com.memrise.android.memrisecompanion-1.png";
    var footer1 = "{footer|icon:" + defaultFooterIcon + "} {footer|text:" + footer +"}";
    var footer2 = "{footer|icon:" + footerIcon + "} {footer|text:" + footer + "}";

    if (author) author = "{author|icon:{usericon}}{author|name:{self}}"; else author = "";
    var randomColors = "#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226,#26e2c0,#2633e2,#8126e2";
    
    if (!thumb || thumb == true) thumb = "{thumb|url:{guild|icon}}";
    else if (thumb == "user") thumb = "{thumb|url:{usericon}}";
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
                     {color:{randlist:"+ color +"} \
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
    var color = "#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226,#26e2c0,#2633e2,#8126e2";
    if (!thumb) thumb = "{guild|icon}"; else thumb = "http://en.freejpg.com.ar/asset/900/5c/5c82/F100011050.jpg";

    var embed = "{embed: \
                     {title:" + title +"} \
                     {type: rich} \
                     {color:{randlist:"+ color +"} \
                    {thumb|url:"+ thumb +"} \
                    {desc: \
               " + description + " \
                      } \
             }";
    return embed;
}

