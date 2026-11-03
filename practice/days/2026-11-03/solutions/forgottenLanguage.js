const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const k = parseInt(tokens[ptr++], 10);
        const forgotten = [];
        for (let j = 0; j < n; j++) {
            forgotten.push(tokens[ptr++]);
        }

        const modern = new Set();
        for (let j = 0; j < k; j++) {
            const l = parseInt(tokens[ptr++], 10);
            for (let m = 0; m < l; m++) {
                modern.add(tokens[ptr++]);
            }
        }

        const res = [];
        for (let j = 0; j < n; j++) {
            if (modern.has(forgotten[j])) {
                res.push('YES');
            } else {
                res.push('NO');
            }
        }
        out.push(res.join(' '));
    }

    console.log(out.join('\n'));
}

solve();
