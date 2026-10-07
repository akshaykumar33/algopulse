const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const x = BigInt(input[ptr++]);
        const y = BigInt(input[ptr++]);
        if (x * x === 2n * y) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    console.log(out.join('\n'));
}

solve();
