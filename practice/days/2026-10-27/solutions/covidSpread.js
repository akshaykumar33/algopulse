const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const d = parseInt(tokens[ptr++], 10);
        let cur = 1;
        for (let day = 1; day <= d; day++) {
            if (day <= 10) {
                cur *= 2;
            } else {
                cur *= 3;
            }
            if (cur >= n) {
                cur = n;
                break;
            }
        }
        if (cur > n) cur = n;
        out.push(cur);
    }
    console.log(out.join('\n'));
}
solve();
