
//Count
function getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer)
    if (author) author = "{author|icon:{usericon}}{author|name:{self}}" else author = "";
    var randomColors = "#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226, #26e2c0,#2633e2,#8126e2";
    if (thumb == "") thumb;
    if (fields == "") fields = "";
    if (color == "") color = randomColors;
    
    if (footer != undefined && footerIcon == undefined) footer = "{footer|icon:http://www.mahditajik.ir/wp-content/uploads/2016/07/com.memrise.android.memrisecompanion-1.png} \
                                                                  {footer|text:33}";
    else if (footer != "" && footerIcon != "") footer = "{footer|icon:43} \
                                                         {footer|text:dd}";
    else footer = "";
    
    

    var embed = "{embed: \
                     {title:" + title +"} \
                     {type: rich} \
                     " + author + " \
                     {color:{randlist:"+ color +"} \
                    {thumb|url:"+ thumb +"} \
                    {desc: \
               " + description + " \
                      } \
                " + fields + " \
                " + footer + " \
             }";
    return embed;
}

function getSimpleEmbed(title, thumb, description){
    var color = "#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226, #26e2c0,#2633e2,#8126e2";
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

