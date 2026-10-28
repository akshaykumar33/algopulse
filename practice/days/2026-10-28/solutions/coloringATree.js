const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const p = new Array(n + 1);
    p[1] = 0;
    for (let i = 2; i <= n; i++) {
        p[i] = parseInt(tokens[ptr++], 10);
    }
    const c = new Array(n + 1);
    for (let i = 1; i <= n; i++) {
        c[i] = parseInt(tokens[ptr++], 10);
    }
    let ans = 1;
    for (let i = 2; i <= n; i++) {
        if (c[i] !== c[p[i]]) {
            ans++;
        }
    }
    console.log(ans);
}

solve();
