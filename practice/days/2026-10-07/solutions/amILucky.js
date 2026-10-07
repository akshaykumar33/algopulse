const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!input || !input[0]) return;
    const t = parseInt(input[0], 10);
    let idx = 1;
    const out = [];
    for (let i = 0; i < t; i++) {
        if (idx >= input.length) break;
        const parts = input[idx++].trim().split(/\s+/).map(Number);
        const n = parts[0], x = parts[1], k = parts[2];
        const remB = x % k;
        const remG = (n - x) % k;
        out.push(Math.abs(remB - remG));
    }
    console.log(out.join('\n'));
}

solve();
