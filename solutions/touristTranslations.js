const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    let t = parseInt(input[ptr++], 10);
    let m = input[ptr++];
    let lowerM = m.toLowerCase();
    let upperM = m.toUpperCase();
    let out = [];
    while (t-- > 0 && ptr < input.length) {
        let s = input[ptr++];
        let res = '';
        for (let i = 0; i < s.length; i++) {
            let code = s.charCodeAt(i);
            if (code >= 97 && code <= 122) {
                res += lowerM[code - 97];
            } else if (code >= 65 && code <= 90) {
                res += upperM[code - 65];
            } else if (s[i] === '_') {
                res += ' ';
            } else {
                res += s[i];
            }
        }
        out.push(res);
    }
    console.log(out.join('\n'));
}

solve();
