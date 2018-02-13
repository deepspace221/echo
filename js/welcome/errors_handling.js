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

