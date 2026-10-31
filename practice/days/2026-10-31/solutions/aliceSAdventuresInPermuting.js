const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = BigInt(tokens[ptr++]);
        const b = BigInt(tokens[ptr++]);
        const c = BigInt(tokens[ptr++]);

        if (b === 0n) {
            if (c >= n) {
                out.push(n.toString());
            } else if (c >= n - 2n) {
                out.push((n - 1n).toString());
            } else {
                out.push("-1");
            }
        } else {
            if (c >= n) {
                out.push(n.toString());
            } else {
                let k = (n - 1n - c) / b + 1n;
                if (k < 0n) k = 0n;
                out.push((n - k).toString());
            }
        }
    }

    console.log(out.join('\n'));
}

solve();
