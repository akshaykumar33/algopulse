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
        const [n, x, c] = line.split(/\s+/).map(Number);
        const a = input[ptr++].trim().split(/\s+/).map(Number);

        let sum = 0;
        const target = x - c;
        for (let i = 0; i < n; i++) {
            sum += a[i] > target ? a[i] : target;
        }
        out.push(sum);
    }

    console.log(out.join('\n'));
}

solve();
