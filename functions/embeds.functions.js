
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
    if (thumb) thumb = "{guild|icon}"; else thumb = "https://images-ext-1.discordapp.net/external/Gzl0XG3nWwTNhcwHU69Onr9YmevH3wf7zVj1yN9PDE4/https/cdn.discordapp.com/icons/335021599059345408/55e56fb9d7850f3a1a9cfe8626c0a0d9.jpg?width=72&height=72";

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

