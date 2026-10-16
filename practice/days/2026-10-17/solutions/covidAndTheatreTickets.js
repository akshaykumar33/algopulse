const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(input[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const parts = input[i].trim().split(/\s+/);
        const n = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        const ans = Math.ceil(n / 2) * Math.ceil(m / 2);
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
