const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    for (let i = 0; i < m; i++) {
        ptr += 2;
    }
    const res = [];
    for (let i = 0; i < n; i++) {
        res.push(i % 2);
    }
    console.log(res.join(''));
}

solve();
