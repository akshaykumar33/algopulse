const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const s = lines[i];
        let cnt = 0;
        for (let j = 0; j < s.length - 1; j++) {
            if (s[j] === '<' && s[j + 1] === '>') {
                cnt++;
            }
        }
        out.push(cnt);
    }
    console.log(out.join('\n'));
}

solve();
