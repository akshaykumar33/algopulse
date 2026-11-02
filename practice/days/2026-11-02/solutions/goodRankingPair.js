const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        out.push(2);
        const a1 = new Array(n);
        const a2 = new Array(n);
        for (let i = 0; i < n; i++) {
            a1[i] = i + 1;
            a2[i] = n - i;
        }
        out.push(a1.join(' '));
        out.push(a2.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
