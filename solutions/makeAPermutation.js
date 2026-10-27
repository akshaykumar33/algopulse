const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const present = new Uint8Array(n + 1);
        let extra = 0;
        for (let j = 0; j < n; j++) {
            const val = parseInt(tokens[ptr++], 10);
            if (val >= 1 && val <= n) {
                if (present[val] === 1) {
                    extra++;
                } else {
                    present[val] = 1;
                }
            } else {
                extra++;
            }
        }
        let missing = 0;
        for (let j = 1; j <= n; j++) {
            if (present[j] === 0) {
                missing++;
            }
        }
        out.push(Math.min(extra, missing));
    }
    console.log(out.join('\n'));
}
solve();
