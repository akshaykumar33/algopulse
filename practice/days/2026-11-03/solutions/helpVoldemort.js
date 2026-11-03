const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(parseInt(tokens[ptr++], 10));
    }
    arr.sort((a, b) => a - b);
    let ans = 0;
    for (let i = 0; i < Math.floor(n / 2); i++) {
        ans += 2 * arr[i] * arr[n - 1 - i];
    }
    console.log(ans);
}

solve();
