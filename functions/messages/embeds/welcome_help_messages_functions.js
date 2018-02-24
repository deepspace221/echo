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
```}\
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
 
      return  getExpandableEmbed(title, "", color, thumb, description, "", "", "");  
   
}

function getPlatformEmbed(){
      use server_db;
      var roleSlices = JSON.parse(server_db["roleSlices"]);
      var arrPlatforms = roleSlices.platforms;
      
      for (var i = 0; i < arrPlatforms.length; i++){
            if (/(Memrise|Duolingo|Anki|Tinycards)/i.test(arrPlatforms[i]))
                arrPlatforms[i] = arrPlatforms[i] + createEmptyStr(100 - arrPlatforms[i].length) + " [access]";
      }
      arrPlatforms = arrPlatforms.sort(function(a, b){
            if (a > b) return 1;
            if (a < b) return -1;
            if (a == b) return 0;  
      });

      arrPlatforms = insertArrStart(arrPlatforms, "# ");
      var outputStr = createArrOutputNewLinesSeprated(arrPlatforms);
      
      var title = "LANGUAGE PLATFORM ROLES";
      var color = "";
      var thumb = "server";
      var description = "\
\nTell us which resourses do you use in your studies by tagging yourself with **.iam [role name]** commands.\
\n\
\nRoles marked with **[access]** will grant you access to additional rooms which are related to these roles.\
";
      var fields = "\
            {field[0]|name:Platform roles: (" + arrPlatforms.length + ")<:blank:352901517004636163>}\
            {field[0]|value:\
```css\n\
" + outputStr + "\
```}\
            {field[0]|inline:true}\
";

        return  getExpandableEmbed(title, "", color, thumb, description, fields, "", "");  

}


function getWelcomeHelpEmbed(){
      var title = "WELCOME CHANNEL COMMANDS QUICK INFORMATION";    
      var color = "";
      var description = "A list of frequent commands to help you get started and setup your profile.";
      var thumb = "server";
      var fields = "\
            {field[0]|name:Roles help commands:}\
            {field[0]|value:\
```css\
\n\\help\
\n\\lang\
\n\\timezone\
\n\\platform\
\n\\misc\
```}\
            {field[0]|inline:true}\
            {field[1]|name:General server commands:}\
            {field[1]|value:\
```css\
\n\\server\
\n\\request [MSG]\
```}\
            {field[1]|inline:true}\
            {field[2]|name:Adding/Removing roles:}\
            {field[2]|value:\
```css\
\n.iam [role name]\
\n.iamnot [role name]\
```}\
            {field[2]|inline:false}\
";
      
      
//       return  getExpandableEmbed(title, "", color, thumb, description, fields, "", "");  
}

function getMiscEmbed(){

      var title = "MISCELLANEOUS ROLES";
      var color = "";
      var thumb = "server"
      var description = "Information on other available roles on the server.";
      var fields = "\
            \n{field[0]|name:Misc:}\
            \n{field[0]|value:\
```css\
\n# Course Creator [access]\
\n# NSFW [access]\
\n# Polyglot [access]\
\n# Correct Me\
\n# Ask a Native\
\n# linguistics\
\n# IPA\
\n# Mobile User\
\n# XP Contests\
\n# LGBT\
```}\
            {field[1]|inline:true}\
            {field[1]|name:Hobbies:}\
            {field[1]|value:\
```css\
\n# Anime [access]\
\n# programmer\
\n# Satellites [access]\
\n# Gamer\
\n# Traveler\
\n# Chess\
\m```}\
            {field[1]|inline:true}\
            {field[2]|name:Notes:}\
            {field[2]|value:\
\n👉 You should only give yourself the **Polyglot** role if you're confident in your ability **in 4 languages or above**. This role will grant you access to some channels.\
\n\
\n👉 The **Mobile User** role if ment for users who spent more than 70% of their time on mobile.\
\n\
\n👉  The **Course Creator** role is only intended for course creators. It will grant you write access to the channels <#335566625749336084> and <#338302446591803392>. You will need to contact a staff member with your memrise username in order to receive it.\
\n}\
            {field[2]|inline:false}\
";

        return  getExpandableEmbed(title, "", color, thumb, description, fields, "", "");  
}

function getServerMsg(){
      var title = "Server statistics for {guild|name} <:cc:337623208243101698>";    
      var color = "";
      var author = "" //add kik author info
      var thumb = "server";
      var description = "A list of frequent commands to help you get started and setup your profile.";
      var fields = "\
            {field[0]|name:Server Info}\
            {field[0]|value:\
```md\
\n# Region:       [{guild|region}]\
\n# Channels:     [{channelcount}]\
\n# Roles:        [{rolecount}]\
\n# Members:      [" + getMembersCount("users") +"]\
\n# Bots:         [" + getMembersCount("bots") +"]\
\n# Languages:    [" + getNumSupported() +"]\
```}\
            {field[0]|inline:true}\
";
       return  getExpandableEmbed(title, "", color, thumb, description, fields, "", "");   
}

function crossReferenceLangs(arrNative, arrFluent, arrLearning){
      var arrOutput = arrNative;
      for (var i = 0; i < arrNative.length; i++){
            if (!isValueInArr(arrLearning, arrNative[i]))
                 arrOutput[i] = arrOutput[i] + createEmptyStr(15 - arrOutput[i].length) + "<native>";
      } 
      for (var i = 0; i < arrLearning.length; i++){
            if (!isValueInArr(arrOutput, arrLearning[i]))
               arrOutput.push(arrLearning[i] + createEmptyStr(15 - arrLearning[i].length) + "<learning>");
      }
      for (var i = 0; i < arrOutput.length; i++){
          if (isValueInArr(arrFluent, arrOutput[i])){
                arrOutput[i] = arrOutput[i] + createEmptyStr(15 - arrOutput[i].length) + "<fluent>";
          }
      }  
            

      arrOutput = arrOutput.sort(function(a,b){
            if (a > b) return 1;
            if (a < b) return -1;
            if (a == b) return 0;  
      });
      return arrOutput;
}



function getLanguagesEmbed(){
      use server_db; 
      var output = {
            arr1: [],
            arr2: [],
            arr3: [],
            strOut1: "",
            strOut2: ""
      };
      var roleSlices, numOfLangs, arrOutput;
            
      var langObj = {
            arrNative: [],
            arrFluent: [],
            arrLearning: []
      };

      roleSlices = JSON.parse(server_db["roleSlices"]);
      
      langObj.arrNative = removeFirst3charsFromArr(roleSlices.lang.native);
      langObj.arrNative.pop();
      langObj.arrFluent = removeFirst3charsFromArr(roleSlices.lang.fluent);
      langObj.arrFluent.pop();
      langObj.arrLearning = roleSlices.lang.learning.splice(0, roleSlices.lang.learning.length -4);
//       langObj.arrLearning.push("welsh");
//       dbg(langObj.arrLearning);
//       dbg(langObj.arrFluent);
//       dbg(langObj.arrNative);
     
      arrOutput = crossReferenceLangs(langObj.arrNative, langObj.arrFluent, langObj.arrLearning);
      arrOutput = insertArrStart(arrOutput, "# ");
      numOfLangs = arrOutput.length;

      
//       arr = arr.concat(roleSlices.lang.learning.slice(-4));
      
      var spliceLimit = (arrOutput.length % 2 == 0) ? arrOutput.length/2 : arrOutput.length/2+1;
      output.arr1 = arrOutput.splice(0, spliceLimit);
      output.arr2 = arrOutput; 
      output.arr3 = roleSlices.lang.learning.slice(-4);
      output.strOut1 = createArrOutputNewLinesSeprated(output.arr1);
      output.strOut2 = createArrOutputNewLinesSeprated(output.arr2);
      output.strOut3 = createArrOutputNewLinesSeprated(output.arr3);

      var title = "Currently available languages";
      var author = "";
      var color = "";
      var thumb = "";
      var description = "If your language is not listed, please contact a member of our staff and it will be dealt with promptly.";
      var fields = "";
      var fields = "\
{field[0]|name:Languages (" + numOfLangs + ") <:blank:352901517004636163>}\
{field[0]|value:\
```md\n\
" + output.strOut1 + "\
```}\
            {field[0]|inline:true}\
            {field[1]|name:<:blank:352901517004636163>}\
            {field[1]|value:\
```md\n\
" + output.strOut2 + "\
```}\
            {field[1]|inline:true}\
            {field[2]|name:Other options}\
            {field[2]|value:\
```md\n\
" + output.strOut3 + "\
```}\
            {field[2]|inline:false}\
";       
       return getExpandableEmbed(title, author, color, thumb, description, fields, "", "");      
}


function getReturningMemberMsg(arr){
      var title = "Returning member";
      var color = "";
      var thumb = "server";
      var description = "Welcome back <@" + UserID + ">! \nPlease wait a sec while we restore your old profile back.";
      var fields = "\
            {field[0]|name:Restored profile roles (" + arr.length +")}\
            {field[0]|value:" + createArrOutputCommaSeprated(getArrRoleIDtoRoleName(arr)) +"}\
            {field[0]|inline:true}\
";
      return  getExpandableEmbed(title, "", color, thumb, description, fields, "", "");      
}
