[#CONTINUE#]
E-mupdb={init}
{Event:MemberUpdate}
{redirect:383815819488133140}
#js >>
import "https://raw.githubusercontent.com/deepspace221/echo/master/functions/events_functions.js";
import "https://raw.githubusercontent.com/deepspace221/echo/db4fc6c9d83954c489c47892028ed0820be711c0/functions/roles.functions.js";
import "https://raw.githubusercontent.com/deepspace221/echo/master/functions/general_purpose_functions.js";
import "https://raw.githubusercontent.com/deepspace221/echo/master/functions/debug.functions.js";
use server_members_db;

var membersObj = {};

if (!server_members_db["membersInfo"] != undefined){
        initServerMembersDB();
} 
else{
   membersObj = JSON.parse(server_members_db["membersInfo"])
   membersObj[UserID].roles = getUserObj(UserID).Roles.slice(0);
}


 
 
// for (i = 0; i < ServerMembers.length; i++) {
//                  if (ServerMembers[i].User.ID == UserID) {
//                  	  ROLES[UserID] = ServerMembers[i].Roles;	
//                 }
//                 break;
// }

// if (MemberHasRole(335021599059345408, UserID, "Muted")) { 
//         if (MemberHasRole(335021599059345408, UserID, "All")) 
//                     resp = "{readonly:337513163853529088}{ars:jail} :mute: <@{/rawid}> has been muted and sent to #jail. :lock: \n{take:All}";
//         else
//                     resp = "";
// }

>>
[#CONTINUE#]
P-jail={init}
{arslock}
{redirect:347486639016116224}
{user} You've been a naughty boy and were sent to the slammer to serve up your sentence! 
Your punishment is **life imprisonment.** :lock: 
You may be eligible for a quick parole so please wait for a mod to come and review your case.
