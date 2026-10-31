const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        let c0 = 0;
        let c1 = 0;
        for (let j = 0; j < n; j++) {
            const val = parseInt(tokens[ptr++], 10);
            if (val === 0) c0++;
            else c1++;
        }
        if (c0 > 0) {
            out.push(1);
        } else {
            out.push(1);
        }
    }
    console.log(out.join('\n'));
}

solve();
