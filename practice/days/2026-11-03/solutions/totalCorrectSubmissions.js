const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const map = new Map();
        for (let i = 0; i < 3 * n; i++) {
            const code = tokens[ptr++];
            const count = parseInt(tokens[ptr++], 10);
            map.set(code, (map.get(code) || 0) + count);
        }
        const vals = Array.from(map.values()).sort((a, b) => a - b);
        out.push(vals.join(' '));
    }
    console.log(out.join('\n'));
}
solve();
