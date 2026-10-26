const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const a = BigInt(lines[ptr++]);
        const b = BigInt(lines[ptr++]);
        const n = BigInt(lines[ptr++]);

        if (n % 2n === 0n) {
            const absA = a < 0n ? -a : a;
            const absB = b < 0n ? -b : b;
            if (absA > absB) out.push(1);
            else if (absA < absB) out.push(2);
            else out.push(0);
        } else {
            if (a > b) out.push(1);
            else if (a < b) out.push(2);
            else out.push(0);
        }
    }
    console.log(out.join('\n'));
}

solve();
