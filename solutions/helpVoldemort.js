const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const arr = new Float64Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = Number(tokens[ptr++]);
    }
    arr.sort();
    let ans = 0;
    for (let i = 0; i < n - 1; i++) {
        ans += arr[i] * arr[i + 1];
    }
    console.log(ans);
}

solve();
