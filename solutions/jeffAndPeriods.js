const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const pos = new Map();
    for (let i = 0; i < n; i++) {
        const val = parseInt(tokens[ptr++], 10);
        if (!pos.has(val)) {
            pos.set(val, []);
        }
        pos.get(val).push(i);
    }
    const res = [];
    const keys = Array.from(pos.keys()).sort((a, b) => a - b);
    for (const val of keys) {
        const indices = pos.get(val);
        if (indices.length === 1) {
            res.push(val + ' ' + 0);
        } else {
            const diff = indices[1] - indices[0];
            let ok = true;
            for (let i = 2; i < indices.length; i++) {
                if (indices[i] - indices[i - 1] !== diff) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                res.push(val + ' ' + diff);
            }
        }
    }
    const out = [];
    out.push(res.length);
    for (const s of res) {
        out.push(s);
    }
    console.log(out.join('\n'));
}

solve();
