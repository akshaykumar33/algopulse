const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);

    const b = [];
    for (let i = 0; i < n; i++) {
        b.push(parseInt(tokens[ptr++], 10));
    }

    let ans = b[n - 1] - b[0] + 1;
    const diffs = [];
    for (let i = 0; i < n - 1; i++) {
        diffs.push(b[i + 1] - b[i] - 1);
    }
    diffs.sort((a, b) => a - b);

    for (let i = 0; i < k - 1; i++) {
        if (diffs.length > 0) {
            ans -= diffs.pop();
        }
    }

    console.log(ans);
}

solve();
