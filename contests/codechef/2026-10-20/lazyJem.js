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
        const parts = line.split(/\s+/);
        let n = BigInt(parts[0]);
        const b = BigInt(parts[1]);
        let m = BigInt(parts[2]);
        let total = 0n;

        while (n > 0n) {
            const solved = (n + 1n) / 2n;
            total += solved * m;
            n -= solved;
            if (n > 0n) {
                total += b;
                m *= 2n;
            }
        }
        out.push(total.toString());
    }

    console.log(out.join('\n'));
}

solve();
