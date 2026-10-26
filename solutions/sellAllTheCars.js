const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!lines || lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    const MOD = 1000000007;

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++], 10);
        const p = [];
        for (let i = 0; i < n; i++) {
            p.push(parseInt(lines[ptr++], 10));
        }
        p.sort((a, b) => b - a);
        let ans = 0;
        for (let i = 0; i < n; i++) {
            const profit = p[i] - i;
            if (profit > 0) {
                ans = (ans + profit) % MOD;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
