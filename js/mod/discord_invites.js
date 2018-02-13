[#CONTINUE#]
\banlist={init}
{req:staff}
```{banlist}```
[#CONTINUE#]
&{:}(https:\/\/|http:\/\/|www.|)discord.(gg|com)\/.*={init}{-mentions}
{exc:Staff,Partners,Bots}
DB:DISCORDINVITES.{/rawid}-{/user}?:{ars:discordinvitekick}{e?DISCORDINVITES:{rawid}-{/user}(++)}
Response.nil?:{ars:discordinvitekick}{m?DISCORDINVITES:{rawid}-{/user}}:=1
[#CONTINUE#]
discordinvitekick={init}
{arslock}
Count.{r?DISCORDINVITES:{rawid}-{/user}} == 1?: {ars:discordchkchannel} 
Count.{r?DISCORDINVITES:{rawid}-{/user}} == 2?: {del}{user} You already posted your invite. You allowed to post only once. Don't abuse this function or will lead to disciplinary actions.
Count.{r?DISCORDINVITES:{rawid}-{/user}} == 3?: {del}{user} You already posted your invite. Next post will lead to a kick
Count.{r?DISCORDINVITES:{rawid}-{/user}} == 4?: {del}{kick} {user} abused the invite function and kicked himself from the server lol!
Count.{r?DISCORDINVITES:{rawid}-{/user}} == 5?: {del}{ban} {user} have been banned from the server for abusing the system.
Response.nil?:{stop}
[#CONTINUE#]
discordchkchannel={init}
{arslock}
Channel.discord-servers?:{delme:5s}{ars:discordinvite}{user} Pay attention that each user is only allowed to post 1 invite. Don't abuse this system as it will result in a kick.
Response.nil?:{del} Your message has been redirected to: <#351020755032604672>! Don't abuse this system as it will result in a kick. {ars:discordinvite}
[#CONTINUE#]
discordinvite={init}
{redirect:351020755032604672}
Channel.discord-servers?:{stop}
Response.nil?:{
{embed:
    {title:{/user}'s Server}
    {type:rich}
    {author|name:{/user}}
    {author|icon:{usericon}}
    {author|url:{usericon}}
    {color:
        {randlist:
             #ff0000,#00ff00,#ffffff,#4286f4,
             #f45642,#262525,#e2d626,#87e226,
             #26e2c0,#2633e2,#8126e2
        }
    }
    {thumb|url:{usericon}}
    {desc:
{content}
    }
    {footer|icon:https://xtclabs.net/img/favicon-new.png}
    {footer|text: Discord Servers List}
}
}
