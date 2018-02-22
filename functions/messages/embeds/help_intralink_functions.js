function getIntralinkHelp(){
        // var thumb = "https://images-ext-1.discordapp.net/external/Gzl0XG3nWwTNhcwHU69Onr9YmevH3wf7zVj1yN9PDE4/https/cdn.discordapp.com/icons/335021599059345408/55e56fb9d7850f3a1a9cfe8626c0a0d9.jpg"; 

    var title = "Commands help for ars://memriseandduolingo intralink server. ";
    var color = "#dcf608";
    var author = "";
    var thumb = ""; 
    var footerIcon ="http://androidcenter.com/wp-content/uploads/MEMRISE.png";
    var footer = "Info provided by the Memrise & Duolingo language server";
    
    var description = " \
    \n`\\lang euronews` \
    \n`\\lang easy languages` \
    \n`\\lang platforms` \
    \n`\\lang dictionaries` \
    \n`\\lang tools` \
    \n`\\lang games` \
    \n`\\lang tv` \
    \n`\\lang info` \
    \n`\\lang speaking` \
    \n`\\lang duolingo` \
    \n`\\lang memrise` \
    \n`\\add [category] [name] [link]` \
    \n`\\remove [category] [search_term]` \
    ";
    
    var fields;
  return getExpandableEmbed(title, author, color, thumb, description, fields, footerIcon, footer);   
}
  
  
