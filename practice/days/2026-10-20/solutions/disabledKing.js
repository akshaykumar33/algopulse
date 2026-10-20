const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(input[0]);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = parseInt(input[i]);
        if (n % 2 === 0) {
            out.push(n);
        } else {
            out.push(n - 1);
        }
    }
    console.log(out.join('\n'));
}

solve();
