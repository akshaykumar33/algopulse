const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const a = parseInt(tokens[ptr++], 10);
        const b = parseInt(tokens[ptr++], 10);
        const c = parseInt(tokens[ptr++], 10);
        const p = parseInt(tokens[ptr++], 10);
        const q = parseInt(tokens[ptr++], 10);
        const r = parseInt(tokens[ptr++], 10);

        const totalNeeded = (p + q + r) / 2;
        const currentSum = a + b + c;

        if (currentSum > totalNeeded) {
            out.push('YES');
            continue;
        }

        const diff1 = p - a;
        const diff2 = q - b;
        const diff3 = r - c;

        const maxDiff = Math.max(diff1, diff2, diff3);
        if (currentSum + maxDiff > totalNeeded) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }

    console.log(out.join('\n'));
}

solve();
