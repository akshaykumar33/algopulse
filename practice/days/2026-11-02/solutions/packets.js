const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    let ans = 0;
    let sum = 0;
    let cur = 1;
    while (sum < n) {
        if (sum + cur > n) {
            cur = n - sum;
        }
        sum += cur;
        ans++;
        cur *= 2;
    }
    console.log(ans);
}

solve();
