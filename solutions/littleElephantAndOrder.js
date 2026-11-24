const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;

    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const m = parseInt(tokens[ptr++], 10);
        const k = parseInt(tokens[ptr++], 10);

        const a = new Array(n);
        for (let j = 0; j < n; j++) {
            a[j] = parseInt(tokens[ptr++], 10);
        }

        const b = new Array(n);
        for (let j = 0; j < n; j++) {
            b[j] = parseInt(tokens[ptr++], 10);
        }

        let count = 0;
        for (let j = 0; j < n; j++) {
            if (a[j] === b[j]) {
                count++;
            }
        }

        if (count >= k) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }

    console.log(out.join('\n'));
}

solve();
