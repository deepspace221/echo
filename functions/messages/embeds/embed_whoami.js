function getEmbedWhoami(user, icon){

var lineMemriseLevel = icon.memrise + " LVL: " + user.memriseLVL;
var lineMemriseChampion = icon.memrise +" Champion: " + user.MemriseChampion;
var lineDuolingoTrees = icon.duolingo + icon.palmTree + " Finished "+ user.duolingoTrees; 
var lineDuolingo25 = icon.duolingo + " LVL 25: "+ user.duolingo25;
// var lineSpacer1 = generateSpacer(72-lineMemriseLevel.length);
// var lineSpacer2 = generateSpacer(72-lineMemriseChampion.length);

var emb; 
emb = getEmbedObj();
emb.fields = getFieldsObj(10, true);

emb.title = "USER INFORMATION FOR: `" + Username + "`";
// emb.color = colors;
// emb.thumbnail.url = user.avatar
emb.description = "\
\nJoined Date: " + user.joinDate +" \
\nProfile: {user} " + user.Staff + " " + user.Patrons + " " + user.Contributors + " \
\nBot Master: **{ismaster}** \
\nCountry: " + user.country + " |  Timezone: `" + user.timezone + "` \
\n────────────────────────────────────────  \
\n|  " + lineMemriseLevel + lineSpacer1 + lineDuolingoTrees +" \
\n|  " + lineMemriseChampion + lineSpacer2 + lineDuolingo25 + " \
\n──────────────────────────────────────── \
";

emb.fields[0].name = "Memrise/CC";
emb.fields[0].value = "|  " + user.Memrise + user.CourseCreator;
emb.fields[1].name = "Duolingo";
emb.fields[1].value = user.Duolingo;
emb.fields[2].name = "Polyglot";
emb.fields[2].value = user.Polyglot;
emb.fields[3].name = "Voice/NSFW";
emb.fields[3].value = "|  "+ user.Voicemedia + user.nsfw;
emb.fields[4].name = "Ask a Native";
emb.fields[4].value = user.AskaNative;
emb.fields[5].name = "Correct Me";
emb.fields[5].value = user.CorrectMe;
emb.fields[6].name = "Experience Level (" + user.activity + "/50)";
emb.fields[6].value = user.activityBar + " " +user.activityNickname + " \
\n|  " + user.Teachers +"                       " + user.Linguistics + user.GodMode + user.Extras +" \
\n──────────────────────────────────────── \
";
emb.fields[6].inline = false;
emb.fields[7].name = "A B O U T";
emb.fields[7].value = user.about;
emb.fields[7].inline = false;
emb.fields[8].name = "P A R T N E R :globe_with_meridians: S E A R C H";
emb.fields[8].value = user.parnterSearch;
emb.fields[8].inline = false;
emb.fields[9].name = "R O L E S";
emb.fields[9].value = sortedRoles;
emb.fields[9].inline = false;

emb.image.url = user.flagImage;
emb.footer.text = "Type \\help whoami to view configuration info.";
emb.footer.icon_url = "http://androidcenter.com/wp-content/uploads/MEMRISE.png";

return emb; 
}
