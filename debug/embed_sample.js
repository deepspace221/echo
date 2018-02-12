%auto tst={init}
#js >>
var value = {embed: \
    {title:Command examples for {guild|name}}\
    {type:rich}\
    {author|name:{owner|name}}\
    {author|icon:{owner|avatar}}\
    {author|url:{owner|avatar}}\
    {color:\
        {randlist:\
             #ff0000,#00ff00,#ffffff,#4286f4,\
             #f45642,#262525,#e2d626,#87e226,\
             #26e2c0,#2633e2,#8126e2\
        }\
    }\
    {thumb|url:{guild|icon}}\
    {desc:\
{user} {/user} this is js mixed with an ars not in an imported file. \
    }\
}\
";
resp = value;
>>

