const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const c = BigInt(tokens[ptr++]);
        let d = 0n;
        while ((1n << (d + 1n)) <= c) d++;
        const a = (1n << d) - 1n;
        const b = a ^ c;
        out.push((a * b).toString());
    }
    console.log(out.join('\n'));
}
solve();
