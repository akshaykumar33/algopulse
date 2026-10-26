const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 1) return;
    const t = parseInt(lines[0].trim(), 10);
    let ptr = 1;
    const out = [];
    const MOD = 1000000007;
    const twoChoices = new Set(['c', 'g', 'l', 'r']);

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++].trim(), 10);
        const s = lines[ptr++].trim();
        let ans = 1;
        for (let i = 0; i < n; i++) {
            if (twoChoices.has(s[i])) {
                ans = (ans * 2) % MOD;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
