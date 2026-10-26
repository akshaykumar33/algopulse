const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = BigInt(input[ptr++]);
        const k = n / 2n;
        if (n % 2n !== 0n) {
            out.push((k + 1n) * (k + 1n));
        } else {
            out.push(k * (k + 1n));
        }
    }
    console.log(out.join('\n'));
}

solve();
