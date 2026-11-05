const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const x = BigInt(tokens[ptr++]);
        const y = BigInt(tokens[ptr++]);
        const n = x + y;
        const rank = (n * (n + 1n)) / 2n + 1n + x;
        out.push(rank.toString());
    }
    console.log(out.join('\n'));
}

solve();
