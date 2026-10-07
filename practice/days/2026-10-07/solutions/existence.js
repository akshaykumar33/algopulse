const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    const t = parseInt(input[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const parts = input[i].trim().split(/\s+/);
        const x = parseInt(parts[0], 10);
        const y = parseInt(parts[1], 10);
        if (x === y) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
