const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;

    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = new Array(n);
        const b = new Array(n);

        for (let i = 0; i < n; i++) {
            a[i] = parseInt(tokens[ptr++], 10);
        }
        for (let i = 0; i < n; i++) {
            b[i] = parseInt(tokens[ptr++], 10);
        }

        let maxDiff = -Infinity;
        for (let i = 0; i < n; i++) {
            maxDiff = Math.max(maxDiff, a[i] - b[i]);
        }

        const resultIndices = [];
        for (let i = 0; i < n; i++) {
            if (a[i] - b[i] === maxDiff) {
                resultIndices.push(i + 1);
            }
        }
        
        out.push(resultIndices.length);
        out.push(resultIndices.join(' '));
    }

    console.log(out.join('\n'));
}

solve();
