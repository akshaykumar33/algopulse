const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        let c1 = 0;
        let c2 = 0;
        let cgt2 = 0;

        for (let i = 0; i < n; i++) {
            const val = parseInt(tokens[ptr++], 10);
            if (val === 1) {
                c1++;
            } else if (val === 2) {
                c2++;
            } else {
                cgt2++;
            }
        }

        let ans = 0;
        ans += c1 * (n - c1);
        ans += (c1 * (c1 - 1)) / 2;
        ans += (c2 * (c2 - 1)) / 2;

        out.push(ans);
    }

    console.log(out.join('\n'));
}

solve();
