const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === "") return;
    const t = parseInt(lines[0]);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = BigInt(lines[i]);
        let ans = 0n;
        let k = n / 2n;
        ans = 8n * k * (k + 1n) * (2n * k + 1n) / 6n;
        out.push(ans.toString());
    }
    console.log(out.join('\n'));
}

solve();
