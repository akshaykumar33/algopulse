const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = BigInt(tokens[ptr++]);
        const k = BigInt(tokens[ptr++]);
        const q = n / k;
        if (q % k === 0n) {
            out.push('No');
        } else {
            out.push('Yes');
        }
    }
    console.log(out.join('\n'));
}

solve();
