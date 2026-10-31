const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const x = parseInt(tokens[ptr++], 10);
        const y = parseInt(tokens[ptr++], 10);
        const k = parseInt(tokens[ptr++], 10);
        const n = parseInt(tokens[ptr++], 10);
        const need = Math.max(0, x - y);
        let possible = false;
        for (let j = 0; j < n; j++) {
            const p = parseInt(tokens[ptr++], 10);
            const c = parseInt(tokens[ptr++], 10);
            if (p >= need && c <= k) {
                possible = true;
            }
        }
        if (possible) {
            out.push('LuckyChef');
        } else {
            out.push('UnluckyChef');
        }
    }
    console.log(out.join('\n'));
}

solve();
