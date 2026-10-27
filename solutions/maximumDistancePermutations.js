const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const p = new Array(n);
        const q = new Array(n);
        for (let j = 0; j < n; j++) {
            p[j] = j + 1;
        }
        const mid = Math.floor(n / 2);
        for (let j = 0; j < n; j++) {
            q[j] = ((j + mid) % n) + 1;
        }
        out.push(p.join(' '));
        out.push(q.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
