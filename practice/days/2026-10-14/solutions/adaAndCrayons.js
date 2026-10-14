const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const s = lines[i];
        if (!s) continue;
        let uCnt = 0;
        let dCnt = 0;
        for (let j = 0; j < s.length; j++) {
            if (s[j] === 'U' && (j === 0 || s[j - 1] !== 'U')) {
                uCnt++;
            }
            if (s[j] === 'D' && (j === 0 || s[j - 1] !== 'D')) {
                dCnt++;
            }
        }
        out.push(Math.min(uCnt, dCnt));
    }
    console.log(out.join('\n'));
}

solve();
