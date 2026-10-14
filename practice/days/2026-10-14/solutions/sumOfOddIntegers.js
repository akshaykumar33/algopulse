const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(input[0]);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const parts = input[i].trim().split(/\s+/);
        const n = BigInt(parts[0]);
        const k = BigInt(parts[1]);
        if (n >= k * k && (n - k) % 2n === 0n) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
