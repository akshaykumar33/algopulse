const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const p = BigInt(tokens[ptr++]);
        const a = BigInt(tokens[ptr++]);
        const b = BigInt(tokens[ptr++]);
        const c = BigInt(tokens[ptr++]);
        const x = BigInt(tokens[ptr++]);
        const y = BigInt(tokens[ptr++]);
        const anarCost = b + a * x;
        const chakriCost = c + a * y;
        const minCost = anarCost < chakriCost ? anarCost : chakriCost;
        out.push((p / minCost).toString());
    }
    console.log(out.join('\n'));
}
solve();
