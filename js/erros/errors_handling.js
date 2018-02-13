[#CONTINUE#]
&.iam .n={init}
use | 337513163853529088
{if(ischannel):
    Pay attention to the dot, {user}. Here is an example:  ```.iam n. spanish```
} (else) {
}

[#CONTINUE#]
&{:}\.iam memrise lvl [0-9]$={init}
The lowest available level is 10.

[#CONTINUE#]
&{:}^\/.+={init}
Please use backward slash `\` to access echo commands.

[#CONTINUE#]
&{:}^\/.+={init}
Please use backward slash `\` to access echo commands.
[#CONTINUE#]
&{:}how.*unrole={init}
{del:5s}{delme:10s}To unrole please replace `.iam` with `.iamnot`
[#CONTINUE#]
&{:}(?i)\.\binrole\b={init}
{del:5s}{delme:10s}{exc:Staff}What are you trying to do, {user}? You can only use the **.inrole** commands in the <#349824543424118784> room.
[#CONTINUE#]
&{:}(?i)\.\biamn\b={init}
{del}{delme:15s}{exc:Staff}What are you trying to do, {user}? You can only use the **.iamn** commands in the <#337513163853529088> room.
