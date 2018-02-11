
//Count
function getExpendedEmbed(title, color, thumb, description, fields, footerIcon, footer){
    var randomColors = "#ff0000,#00ff00,#ffffff,#4286f4,#f45642,#262525,#e2d626,#87e226, #26e2c0,#2633e2,#8126e2";
    if (thumb == "") thumb = "https://www.google.co.il/";
    if (fields == "") fields = "";
    if (color == "") color = randomColors;
    
    if (footer != "" && footerIcon == "") footer = "{footer|icon:http://www.mahditajik.ir/wp-content/uploads/2016/07/com.memrise.android.memrisecompanion-1.png} \
                                                    {footer|text:" + footer +"}";
    else if (footer != "" && footerIcon != "") footer = "{footer|icon:"+ footerIcon +"} \
                                                         {footer|text:" + footer +"}";

    var embed = "{embed: \
                     {title:" + title +"} \
                     {type: rich} \
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
    if (thumb) thumb = "{guild|icon}"; else thumb = "https://www.google.co.il/";

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

