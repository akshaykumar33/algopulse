const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const m = parseInt(tokens[ptr++], 10);
        const k = parseInt(tokens[ptr++], 10);
        if (n === 1 && m === 1) {
            out.push(0);
        } else if (n === 1 || m === 1) {
            if (k >= 2) {
                out.push(Math.floor(k / 2));
            } else {
                out.push(0);
            }
        } else {
            if (k % 2 === 0) {
                out.push(k);
            } else {
                out.push(k - 1);
            }
        }
    }
    console.log(out.join('\n'));
}

solve();
