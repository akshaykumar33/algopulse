const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = [];
        for (let i = 0; i < n; i++) a.push(parseInt(tokens[ptr++], 10));
        const dp = new Int32Array(n);
        dp[n - 1] = 1;
        for (let i = n - 2; i >= 0; i--) {
            if ((a[i] > 0 && a[i + 1] < 0) || (a[i] < 0 && a[i + 1] > 0)) {
                dp[i] = dp[i + 1] + 1;
            } else {
                dp[i] = 1;
            }
        }
        out.push(dp.join(' '));
    }
    console.log(out.join('\n'));
}
solve();
