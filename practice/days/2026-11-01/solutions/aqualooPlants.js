const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const h = [];
        for (let j = 0; j < n; j++) {
            h.push(parseInt(tokens[ptr++], 10));
        }
        let ans = 0;
        let cur = 0;
        for (let j = 1; j < n; j++) {
            if (h[j] <= h[j - 1]) {
                cur++;
            } else {
                cur = 0;
            }
            if (cur > ans) {
                ans = cur;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
