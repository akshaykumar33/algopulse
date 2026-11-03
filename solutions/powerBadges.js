const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            a[i] = parseInt(tokens[ptr++], 10);
        }

        let badges = 0;
        for (let i = 0; i < n; i++) {
            let leq = 0;
            for (let j = 0; j < n; j++) {
                if (a[j] <= a[i]) leq++;
            }
            if (leq > n - leq) {
                badges++;
            }
        }
        out.push(badges);
    }

    console.log(out.join('\n'));
}

solve();
