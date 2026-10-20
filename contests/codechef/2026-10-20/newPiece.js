const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        if (ptr >= input.length) break;
        const line = input[ptr++].trim();
        if (!line) continue;
        const [a, b, p, q] = line.split(/\s+/).map(Number);
        if (a === p && b === q) {
            out.push(0);
        } else if ((a + b) % 2 !== (p + q) % 2) {
            out.push(1);
        } else {
            out.push(2);
        }
    }

    console.log(out.join('\n'));
}

solve();
