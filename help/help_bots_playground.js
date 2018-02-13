
function getBotsQuickInfo(){
      var title = "BOTS COMMANDS QUICK INFORMATION";
      var color = "";
      var thumb = "";
      var description = "";
      var fields = "\
          {field[0]|name:Echo}\
          {field[0]|value:\
```css\
\n\\server\
\n\\afk\
\n\\afkmsg [MSG]\
\n\\request [MSG]\
\n\\count [lang]\
\n\\sky\
\n\\space\
\n\\joke\
\n\\meme\
\n```}\
        {field[0]|inline:true}\\
        {field[1]|name:Echo whoami}\\
        {field[1]|value:\\
```css\\
\n\\whoami\
\n\\help whoami\
\n\\about [MSG]\
\n\\partner [MSG]\
\n\\flag [COUNTRY]\
\n\\setflag [COUNTRY] [URL]\
\n```}\
        {field[1]|inline:true}\
        {field[2]|name:UB3R}\
        {field[2]|value:\
```css\
\n>fact
\n>cowsay\
\n>define [word]\
\n>ud [word]\
\n>voice\
\n>figlet [word]\
\n>insult\
\n>timer\
\n>g [search term]\
\n>userinfo\
\n```}\
        {field[2]|inline:true}\
        {field[3]|name:Nadeko}\
        {field[3]|value:\
```css\
\n.roles\
\n.inrole [role name]\
\n.checkmyperms\
\n.totube\
\n.iam\
\n.iamnot\
\n```}\
        {field[3]|inline:true}\
        {field[7]|name:Mee6}\
        {field[7]|value:\
```css\
\n!rank\
\n!urban [keyword]\
\n!imgur [keyword]\
\n!manga [search term]\
\n!anime [search term]\
\n```}\
       {field[7]|inline:true}\
       {field[4]|name:Tatsumaki}\
       {field[4]|value:\
```css\
\nt!profile\
\nt!top [global | server ] [page ]\
\nt!credits\
\nt!urban [word]\
\nt!weather [city]\
\nt!wiki [search term]\
\nt!beautiful\
\nt!rps [rock | paper | scissors ]\
\nt!numberfacts [42]\
\nt!fortune [cookie]\
\nt!cat\
\nt!psychopass [mention]\
\nt!reverse <text >\
\nt!dice\
\n```}\
      {field[4]|inline:true}\
      {field[6]|name:Septapus}\
      {field[6]|value:\
```fix\
\n@Septapus avatar \
\n@Septapus emoji <emoji> \
\n@Septapus hugemoji <emoji>\
\n@Septapus comic [1-10]\
\n@Septapus numbertrivia [number]\
\n@Septapus wormhole [send] [msg]\
\n```}\
      {field[6]|inline:true}\
      {field[5]|name:Matbot}\
      {field[5]|value:\
```css\
\n!youtube [search term]\
\n!insult [mention]\
\n!kill [victim]\
\n!kiss [mention]\
\n!lenny\
\n!roulette [title]\
\n!translate\
\n!hangman [wordlength]\
\n!hangmanstop\
\n!trivia\
\n!triviacategory [category]\
\n!triviastop \
\n!typerace\
\n!comic\
\n!dog\
\n!doge [texts]\
\n!face [url]\
\n!yesorno\
\n```}\
      {field[5]|inline:true}\
      {field[8]|name:Do you know a cool command?}\
      {field[8]|value: Let us know and we will add it to the list.}\
      {field[8]|inline:false}\
";  
      return getSimpleEmbed(title, color, thumb, description);    
}


function getEchoQuickInfo(){
      var title = "ECHO COMMANDS QUICK INFORMATION";
      var color = "";
      var thumb = "";
      var description = "A list of frequent commands for easy access.";
      var fields = "\
            {field[0]|name:Echo}\
            {field[0]|value:\
\n```css\
\n\server\
\n\afk\
\n\afkmsg [MSG]\
\n\request [MSG]\
\n\count [lang]\
\n\sky\
\n\space\
\n\joke\
\n\meme\
\n```}\
            {field[0]|inline:true}\
            {field[1]|name:Echo whoami}\
            {field[1]|value:\
```css\
\n\whoami\
\n\help whoami\
\n\about [MSG]\
\n\partner [MSG]\
\n\flag [COUNTRY]\
\n\setflag [COUNTRY] [URL]\
\n```}\
            {field[1]|inline:true}\
";

      return getSimpleEmbed(title, color, thumb, description);    
}
