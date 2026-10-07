const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const x = parseInt(input[ptr++], 10);
        let coins = 0;
        for (let i = n - x + 1; i <= n; i++) {
            coins += (1 << i);
        }
        for (let i = 1; i <= n - x; i++) {
            coins -= (1 << i);
        }
        out.push(coins);
    }
    console.log(out.join('\n'));
}

solve();
