const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const m = parseInt(tokens[ptr++], 10);
        if (n === 1) {
            out.push('0');
            continue;
        }
        const p = [];
        p.push(`1 ${Math.floor((n + 1) / 2)}`);
        for (let u = 2, v = n - 1; u <= v; u++, v--) {
            p.push(`${u} ${v}`);
        }
        out.push(p.length.toString());
        for (const pair of p) out.push(pair);
    }
    console.log(out.join('\n'));
}
solve();
