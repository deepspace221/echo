
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

function getViewsEmbed(){
 
var title = "View options"; 
var color = "";
var thumb = "server";
var icon = ":diamond_shape_with_a_dot_inside:";
   
var description = "\
      \n**Information on how to customize your user's view.**\
      \n\
      \n" + icon + " The **v. Hooks** role is connected to the **Hooks** category and it's by default assigned to every member on this server.\
      \nTo remove it from your view you can run the command `.iamnot hooks` at <#337513163853529088>.\
      \n\
      \n" + icon + " The **v. Mobile** role is connected to the **Mobile** category and it's by default assigned to every member on this server.\
      \nTo remove it from your view you can run the command `.iamnot v. mobile` at <#337513163853529088>.\
      \n\
      \n" + icon + " The **v. Private** role is connected to the **Private** voice category and it's by default assigned to every member on this server.\
      \nTo remove it from your view you can run the command `.iamnot v. private` at <#337513163853529088>.\
      \n\
      \n" + icon + " The **v. Recycle Bin** role is connected to the **recycle bin** category. By default it is not assigned to members on this server.\
      \nTo add it to your view run the command `.iam v. Recycle Bin` at <#337513163853529088>.\
      \n\
      \n" + icon + " The **God Mode** role will allow you to see all the language categories (about 360 channels) irrespectively to the roles assigned to your profile. It will overwrite them. If you wish to view also sub-genre hooks you can, as an addenum to god mod, also add the **Extras** role (about 60 additional channels).\
      \n\
      \nTo add **God Mode** run: `.iam god mode`\
      \nTo add **Extras** run: `.iam Extras`\
      \n\
      \nPlease don't use the extras role without god mode. It is not ment to function this way.\
      \n\
      \nIf you wish to be added to a specific sub-genre hooks channel, without having the god mode/extras role, you can request to be added to the exclusion list of those channels at <#337513299765755905>.\
      \n\
      \n" + icon + " You can unsubscribe from server's <#335379990424059905> by running:\
      \n```.iamnot updates```\
";   
 
      return getSimpleEmbed(title, color, thumb, description);
   
}
