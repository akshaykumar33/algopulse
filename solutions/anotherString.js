const fs = require('fs');

function solve() {
    const l = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(l[0]);
    const o = [];
    for (let i = 1; i <= t; i++) {
        const s = l[i];
        let a = 0;
        for (let j = 0; j < s.length; j++) {
            if (s[j] === 'a') {
                a += s.length - j;
            }
        }
        o.push(a);
    }
    console.log(o.join('\n'));
}

solve();
