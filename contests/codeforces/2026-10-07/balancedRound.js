const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const k = parseInt(input[ptr++], 10);
        const arr = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = parseInt(input[ptr++], 10);
        }
        arr.sort();
        let maxLen = 1;
        let curLen = 1;
        for (let i = 1; i < n; i++) {
            if (arr[i] - arr[i - 1] <= k) {
                curLen++;
            } else {
                curLen = 1;
            }
            if (curLen > maxLen) {
                maxLen = curLen;
            }
        }
        out.push(n - maxLen);
    }
    console.log(out.join('\n'));
}

solve();
