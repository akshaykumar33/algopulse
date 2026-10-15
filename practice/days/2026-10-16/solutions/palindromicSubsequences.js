const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0]);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[i]);
        const res = [];
        for (let j = 1; j <= n - 2; j++) {
            res.push(j);
        }
        res.push(1);
        res.push(2);
        out.push(res.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
