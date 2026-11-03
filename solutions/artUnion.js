const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const m = parseInt(tokens[ptr++], 10);
    const n = parseInt(tokens[ptr++], 10);
    const dp = new Int32Array(n);
    const res = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const t = parseInt(tokens[ptr++], 10);
            const prevPainter = j > 0 ? dp[j - 1] : 0;
            const start = dp[j] > prevPainter ? dp[j] : prevPainter;
            dp[j] = start + t;
        }
        res.push(dp[n - 1]);
    }
    console.log(res.join(' '));
}
solve();
