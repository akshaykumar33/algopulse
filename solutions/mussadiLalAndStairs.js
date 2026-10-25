const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!input || input.length === 0 || input[0] === '') return;
    const t = parseInt(input[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = parseInt(input[i], 10);
        const dp = new Array(n + 1);
        dp[0] = 1;
        dp[1] = 1;
        for (let j = 2; j <= n; j++) {
            dp[j] = dp[j - 1] + dp[j - 2];
        }
        out.push(dp[n]);
    }
    console.log(out.join('\n'));
}

solve();
