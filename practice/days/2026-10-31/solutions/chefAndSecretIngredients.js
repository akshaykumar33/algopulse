const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        let common = null;
        for (let j = 0; j < n; j++) {
            const s = tokens[ptr++];
            const cur = new Set(s);
            if (common === null) {
                common = cur;
            } else {
                const nextCommon = new Set();
                for (const char of common) {
                    if (cur.has(char)) {
                        nextCommon.add(char);
                    }
                }
                common = nextCommon;
            }
        }
        out.push(common ? common.size : 0);
    }
    console.log(out.join('\n'));
}

solve();
