use whoami_db;

var user = {};
var memberIndex, sortedRoles = "", userRoles = [];

var icon = {
    none: "NaN",
    dummyURL: "https://google.com/",
    memrise: "<:memrise1:337621895312834560>",
    memriseCC: "<:memrise:337621895576944650>",
    duolingo: "<:duolingo12:402265833541206027>",
    duolingo2: "<:duolingo:352946192176513026>",
    polyglot: "<:Octopus:337623131932065792>",
    askNative: "<:gringo:402274676153516033>",
    nsfw: "BѠbs",
    godModeExtras: "<:rip:402279584625721346>",
    voicemedia: "🔊",
    correctMe: "<:angry:401900445389291531>",
    palmTree: ":palm_tree:",
    positive: ":white_check_mark:",
    negative: ":negative_squared_cross_mark:",
    zero: ":zero:",
    no: ":regional_indicator_n::regional_indicator_o:",
    fire: ":fire:",
    champTrophy: ":trophy:",
    champ: ":regional_indicator_c::regional_indicator_h::regional_indicator_a::regional_indicator_m::regional_indicator_p:",
    silenceVow: ":regional_indicator_s::regional_indicator_i::regional_indicator_l::regional_indicator_e::regional_indicator_n::regional_indicator_c::regional_indicator_e: :zzz:  :regional_indicator_v::regional_indicator_o::regional_indicator_w:",
    baby: ":regional_indicator_b::regional_indicator_a::regional_indicator_b::regional_indicator_y: ",
    member: ":regional_indicator_r::regional_indicator_e::regional_indicator_g::regional_indicator_u::regional_indicator_l::regional_indicator_a::regional_indicator_r:",
    serious: ":regional_indicator_s::regional_indicator_e::regional_indicator_r::regional_indicator_i::regional_indicator_o::regional_indicator_u::regional_indicator_s:",
    experienced: ":regional_indicator_e::regional_indicator_x::regional_indicator_p::regional_indicator_e::regional_indicator_r::regional_indicator_i::regional_indicator_e::regional_indicator_n::regional_indicator_c::regional_indicator_e::regional_indicator_d:",
    oldDog: ":regional_indicator_o::regional_indicator_l::regional_indicator_d: :dog: :regional_indicator_d::regional_indicator_o::regional_indicator_g:",
    langNerd: ":regional_indicator_l::regional_indicator_a::regional_indicator_n::regional_indicator_g: :nerd:  :regional_indicator_n::regional_indicator_e::regional_indicator_r::regional_indicator_d:",
    langWorrior: ":regional_indicator_l::regional_indicator_a::regional_indicator_n::regional_indicator_g: :regional_indicator_w::regional_indicator_a::regional_indicator_r::regional_indicator_r::regional_indicator_i::regional_indicator_o::regional_indicator_r:",
    legend: ":regional_indicator_l::regional_indicator_e::regional_indicator_g::regional_indicator_e::regional_indicator_n::regional_indicator_d:",
    //   lvl4: "████░░░░░░░░░░░░░░░░", 
    //   lvl6: "██████░░░░░░░░░░░░░░", 
    //   lvl8: "████████░░░░░░░░░░░░", 
    // lvl12: "████████████░░░░░░░░", 
    // lvl16: "████████████████░░░░", 
    // lvl18: "██████████████████░░",
      lvl0: "░░░░░░░░░░░░░░░░░░░░",
      lvl3: "█░░░░░░░░░░░░░░░░░░░",
      lvl5: "██░░░░░░░░░░░░░░░░░░",
    lvl15: "██████░░░░░░░░░░░░░░", 
    lvl30: "████████████░░░░░░░░",
    lvl50: "████████████████████",
    one: ":one:",
    two: ":two:",
    three: ":three:",
    four: ":four:",
    five: ":five:",
    six: ":six:",
    seven: ":seven:",
    eight: ":eight:",
    nine: ":nine:",
    ten: ":one::zero:"
};

var activityBars = {
    lvl0: {bar: icon.lvl0, nickname: icon.silenceVow},
    lvl3: {bar: icon.lvl3, nickname: icon.baby},
    lvl5: {bar: icon.lvl5, nickname: icon.regular},
    lvl15: {bar: icon.lvl15, nickname: icon.experienced},
    lvl30: {bar: icon.lvl30, nickname: icon.oldDog},
    lvl50: {bar: icon.lvl50, nickname: icon.legend}
    // lvl2: {bar: icon.lvl2, nickname: icon.silenceVow},
    // lvl6: {bar: icon.lv6, nickname: icon.member},
    // lvl10: {bar: icon.lv10, nickname: icon.serious},
    // lvl16: {bar: icon.lv16, nickname: icon.langNerd},
    // lvl18: {bar: icon.lv18, nickname: icon.langWorrior},
};

memberIndex = getMemberIndex();
user = getInitUserRolesValuesObj(user);
sortedRoles = createArrOutputCommaSeprated(getArrSortedRolesByPosition());
userRoles = getUserRolesArr();

user.Patrons = "";
user.Contributors = "";
user.Staff = "";
user.Teachers = "";
user.Linguistics = "";
user.GodMode = "";
user.Extras = "";
user.joinDate = ServerMembers[memberIndex].JoinedAt.substring(0, ServerMembers[memberIndex].JoinedAt.indexOf("T"));
user.avatar = "https://discordapp.com/api/v6/users/" + UserID + "/avatars/" + UserImage + ".jpg";
user.duolingo25 = icon.zero;
user.duolingoTrees = icon.zero;
user.memriseLVL = icon.zero + icon.zero;
user.flagImage = icon.dummyURL;
user.MemriseChampion = icon.no;
user.about = icon.none;
user.parnterSearch = icon.none;
user.country = icon.none;
user.timezone = icon.none,
user.activity = "0";
user.activityBar = activityBars.lvl0.bar;
user.activityNickname = activityBars.lvl0.nickname;

for (i = 0; i < userRoles.length; i++) {
    switch (userRoles[i]) {
            case "• Admins":
            case "• Senior Mods":
            case "• Mods":
                break;
            case "• Patrons":
                user.Patrons = icon.positive + " Patron"
                break;
            case "Staff":
                user.Staff = icon.positive + " Staff"
                break;      
            case "v. Mobile":
            case "v. Hooks": 
            case "v. Partners":
            case "v. Courses":
            case "v. Private":
            case "v. Recycle Bin":
                break;
            case "Updates":
            case "Basic":
            case "No Native":
            case "Unassigned":
                break;
            case "Friends":
            case "Contributors":
                user.Contributors = icon.positive + " Contributors"
                break;
            case "Former Staff":
            case "Intralink":
            case "Partners":
            case "Partnership Assistans":
            case "Ambassadors":
            case "Supporter":
            case "CourseCreator":
                user.CourseCreator = icon.memriseCC;
                break;
            case "DJ":
                break;
            case "Feeling Lonely":
            case "Translator":
            case "Ask a Native":
                user.AskaNative = icon.askNative;
                break;
            case "Teachers":
                 user.Teacher = icon.positive + " Teacher";   
                break;
            case "Servers":
            case "XP Contests":
                break;
            case "nsfw":
                user.nsfw = icon.nsfw;   
                break;         
            case "Memrise Champion":
                user.MemriseChampion = icon.champTrophy;
                break;
            case "Duolingo":
                user.Duolingo = icon.duolingo2;
                break;
            case "Memrise":
                user.Memrise = icon.memrise;
                break;
            case "Anki":
            case "Tinycards":
            case "Duolingo":
            case "Readlang":
            case "LingQ":           
            case "Colzemaster":
            case "Lang-8":
                break;
            case "Polyglot":
                user.Polyglot = icon.polyglot;
                break;
            case "Correct Me":
                user.CorrectMe = icon.correctMe;
                break;
            case "Linguistics":
                user.Linguistics = icon.positive + " Linguistics";
                break;
            case "IPA":
            case "Other Lans":
            case "Dead Langs":
                break;
            case "God Mode":
                user.GodMode = icon.positive + " God Mode";
                break;
            case "Extras":
                user.Extras = icon.positive + " Extras";
                break;
            case "Chatty":
            case "Block Chatty":
            case "Mobile User":
                break;
            case "Anime":
            case "Programmer":
            case "Gamer":
            case "Satellites":
            case "Traveler":
                break;
            case "1 Tree LVL 25":
            case "2 Trees LVL 25":
            case "3 Trees LVL 25":
                if (user["3TreesLVL25"] == icon.positive)
                    user.duolingo25 = icon.three;
                else if (user["2TreesLVL25"] = icon.positive)
                    user.duolingo25 = icon.two;               
                else if (user["1TreeLVL25"] = icon.positive)
                    user.duolingo25 = icon.one;               
                break;
            case "1 Tree Completed":
            case "2 Trees Completed":
            case "3 Trees Completed":
            case "4 Trees Completed":
            case "5 Trees Completed":
                if (user["3TreesCompleted"] == icon.positive)
                    user.duolingoTrees = icon.three;
                else if (user["2TreesCompleted"] = icon.positive)
                    user.duolingoTrees = icon.two;               
                else if (user["1TreeCompleted"] = icon.positive)
                    user.duolingoTrees = icon.one;    
                break;
            case "Memrise LVL 10":
            case "Memrise LVL 11":
            case "Memrise LVL 12":
            case "Memrise LVL 13":
            case "Memrise LVL 14":
            case "Memrise LVL 15":
                if (user.MemriseLVL15 == icon.positive)
                    user.memriseLVL = icon.one + icon.five;
                else if (user.MemriseLVL14 = icon.positive)
                    user.memriseLVL = icon.one + icon.four;               
                else if (user.MemriseLVL13 = icon.positive)
                    user.memriseLVL = icon.one + icon.three;               
                else if (user.MemriseLVL12 = icon.positive)
                    user.memriseLVL = icon.one + icon.two;               
                else if (user.MemriseLVL11 = icon.positive)
                    user.memriseLVL = icon.one + icon.one;               
                else if (user.MemriseLVL10 = icon.positive)
                    user.memriseLVL = icon.ten;              
                    break;
            case GetRoleName("346415797544943626"):
                    user.Voicemedia = icon.voicemedia;
                    break;
            case "Activity +5":
            case "Activity +15":
            case "Activity +30":
            case "Activity KING":           
                break;
            case "Team1":
            case "Team2":
                break;
            case "Muted":
                break;
            case "LGBT":
                break;
        };
}

 if (user.ActivityKING == icon.positive){
    user.activity = "50";
    user.activityBar = activityBars.lvl50.bar;
    user.activityNickname = icon.fire + activityBars.lvl50.nickname + icon.fire;
 }
else if (user.Activity30 == icon.positive){
    user.activity = "30";     
    user.activityBar = activityBars.lvl30.bar;
    user.activityNickname = activityBars.lvl30.nickname; 
}         
else if (user.Activity15 == icon.positive){
   user.activity = "15";               
    user.activityBar = activityBars.lvl15.bar;
    user.activityNickname = activityBars.lvl50.nickname; 
}
else if (user.Activity5 == icon.positive){
    user.activity = "5";  
    user.activityBar = activityBars.lvl5.bar;
    user.activityNickname = activityBars.lvl5.nickname;
}
else if (user.Voicemedia == icon.positive){
    user.activity = "3";  
    user.activityBar = activityBars.lvl3.bar;
    user.activityNickname = activityBars.lvl3.nickname;
}  

whoami_db["user"] = JSON.stringify(user);

resp = getEmbedWhoami(user, icon); 


function getInitUserRolesValuesObj(user){
        var role = "";

        for (var i = 0; i < ServerRoles.length; i++) {
                role = getUserRoleKeyName(GetRoleName(ServerRoles[i]["ID"]));
                user[role] = icon.negative;
         }

        for (var i = 0; i < UserRoles.length; i++) {
                    role = getUserRoleKeyName(GetRoleName(UserRoles[i]));
                    user[role] = icon.positive;
        }
        return user;
}
