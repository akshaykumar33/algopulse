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
        const [a, b] = line.split(/\s+/).map(Number);

        if (a === b) {
            out.push('0');
            continue;
        }

        const ma = 31 - Math.clz32(a);
        const mb = 31 - Math.clz32(b);

        if (mb > ma) {
            out.push('-1');
            continue;
        }

        if (ma === mb) {
            out.push('1');
            out.push(String(a ^ b));
            continue;
        }

        const allOnes = Math.pow(2, ma + 1) - 1;
        const x1 = a ^ allOnes;
        const x2 = allOnes ^ b;
        out.push('2');
        out.push(`${x1} ${x2}`);
    }

    console.log(out.join('\n'));
}

solve();
