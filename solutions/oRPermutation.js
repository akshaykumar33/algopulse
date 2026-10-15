const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    const t = parseInt(input[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = parseInt(input[i], 10);
        const arr = [];
        for (let j = 1; j <= n; j++) {
            arr.push(j);
        }
        out.push(arr.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
