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
            arr.push(parseInt(tokens[ptr++], 10));
        }
        arr.sort((a, b) => a - b);
        const minVal = arr[0];
        const maxVal = arr[n - 1];
        const midVal = arr[Math.floor(n / 2)];
        let ans = Math.abs(minVal - midVal) + Math.abs(midVal - maxVal) + Math.abs(maxVal - minVal);
        ans = Math.max(ans, Math.abs(minVal - arr[1]) + Math.abs(arr[1] - maxVal) + Math.abs(maxVal - minVal));
        ans = Math.max(ans, Math.abs(minVal - arr[n - 2]) + Math.abs(arr[n - 2] - maxVal) + Math.abs(maxVal - minVal));
        out.push(ans);
    }
    console.log(out.join('\n'));
}
solve();
