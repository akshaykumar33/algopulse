const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const c = parseInt(tokens[ptr++], 10);
    const dp = new Array(n + 1).fill(-1e9);
    dp[0] = 0;
    for (let i = 1; i <= n; i++) {
        if (i >= a) dp[i] = Math.max(dp[i], dp[i - a] + 1);
        if (i >= b) dp[i] = Math.max(dp[i], dp[i - b] + 1);
        if (i >= c) dp[i] = Math.max(dp[i], dp[i - c] + 1);
    }
    console.log(dp[n]);
}
solve();
