const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = [];
        for (let j = 0; j < n; j++) {
            arr.push(BigInt(tokens[ptr++]));
        }
        arr.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
        const pref = new Array(n + 1).fill(0n);
        for (let j = 0; j < n; j++) {
            pref[j + 1] = pref[j] + arr[j];
        }
        let ans = -1n;
        for (let j = 0; j < n; j++) {
            const leftSum = arr[j] * BigInt(j) - pref[j];
            const rightSum = (pref[n] - pref[j + 1]) - arr[j] * BigInt(n - j - 1);
            const cost = leftSum + rightSum;
            if (ans === -1n || cost < ans) {
                ans = cost;
            }
        }
        out.push(ans.toString());
    }
    console.log(out.join('\n'));
}

solve();
