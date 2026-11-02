const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(parseInt(tokens[ptr++], 10));
    }
    arr.sort((a, b) => a - b);
    const dp = new Array(k + 1).fill(0);
    dp[0] = 1;
    for (let i = 0; i < n; i++) {
        const val = arr[i];
        for (let j = k; j >= val; j--) {
            dp[j] += dp[j - val];
        }
    }
    console.log(dp[k]);
}

solve();
