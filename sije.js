var index = [
// 0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15
 "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
//16   17   18   19   20   21   22   23   24   25   26   27   28   29   30   31
 "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F",
//32   33   34   35   36   37   38   39   40   41   42   43   44   45   46   47
 "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
//48   49   50   51   52   53   54   55   56   57   58   59   60   61   62   63
 "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", ".",
//64   65   66   67   68   69   70   71   72   73   74   75   76   77   78   79
 ":", ",", ";", "-", "_", "(", ")", "<", ">", "[", "]", "{", "}", "ñ", "Ñ", "¿",
//80   81   82   83   84   85   86   87   88   89   90   91   92   93   94   95
 "?", "¡", "!", "=", "+", "*", "%", "·", "/", "&", "#", "@", "$", "€", "|", "'",
//96   97   98   99   100  101  102  103  104  105  106  107  108  109  110  111
"\"","\n","\r","\\", "~", "`", "´", "¨", "^", "¬", "ü", "Ü", "ä", "Ä", "ë", "Ë",
//112  113  114  115  116  117  118  119  120  121  122  123
 "ï", "Ï", "ç", "Ç", "ĥ", "Ĥ", "ĵ", "Ĵ", "ŭ", "Ŭ", "º", "ª"
];


function index_char (c)
  {
    var i, j=-1;
    for (i=0; i<table.length; i++)
      {
        if (c == table[i])
          {
            j = i;
            break;
          }
      }
    return j;
  }

function char_index (i)
  {
    return index[i];
  }

function e_char (c, k)
  {
    var an, bn, cn;
    an = index_char (c);
    bn = index_char (k);
    cn = (an + bn) % index.length;
    return char_index (cn);
  }

function d_char (c, k)
  {
    var an, bn, cn;
    an = index_char (c);
    bn = index_char (k);
    cn = an - bn;
    while (cn < 0)
      cn = index.length + cn;
    return char_index (cn);
  }

function encriptar (text, password)
  {
    // Salt
    var salt = table[parseInt((Math.random()*(table.length-1)))];
    salt = salt + table[parseInt((Math.random()*(table.length-1)))];
    // Encrypted
    var encrypt=salt;
    // Password
    var pass = document.getElementById(id_pass).value;
    pass = salt[0] + pass + salt[1];
    // Flow
    var flow = e_char (pass[0], pass[1]);
    var pass_flow = 2;
    var i;
    for (i=0; i<text.length; i++)
      {
        encrypt += e_char (text[i], flow);
        alert (text[i] + " " + flow + " " + encrypt);
        document.getElementById('chat').value += flow;
        flow = e_char (flow, pass[pass_flow]);
        pass_flow = (pass_flow + 1) % pass.length;
      }
    return encrypt;
  }

function desencriptar (id_form, id_textarea, id_pass)
  {
    // Text
    var text = document.getElementById(id_textarea).value;
    // Salt
    var salt = text[0];
    salt = salt + text[1];
    // Desencrypted
    var desencrypt="";
    // Password
    var pass = document.getElementById(id_pass).value;
    pass = salt[0] + pass + salt[1];
    // Flow
    var flow = e_char (pass[0], pass[1]);
    var pass_flow = 2;
    var i;
    for (i=2; i<text.length; i++)
      {
        desencrypt += d_char (text[i], flow);
        alert (text[i] + " " + flow + " " + desencrypt);
        document.getElementById('chat').value += flow;
        flow = e_char (flow, pass[pass_flow]);
        pass_flow = (pass_flow + 1) % pass.length;
      }
    document.getElementById(id_textarea).value = desencrypt;
        document.getElementById('chat').value += "\n";
  }

alert ("*"+e_char (' ', 'J')+"*");
alert ("*"+e_char ("\r", 'J')+"*");
alert ("*"+d_char ("\r", 'J')+"*");
