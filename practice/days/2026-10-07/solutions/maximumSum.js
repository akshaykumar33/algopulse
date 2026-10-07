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
        const arr = new Float64Array(n);
        for (let i = 0; i < n; i++) arr[i] = parseFloat(input[ptr++]);
        
        if (k >= n) {
            out.push(0);
            continue;
        }
        const w = n - k;
        let cur = 0;
        for (let i = 0; i < w; i++) cur += arr[i];
        let maxSum = cur;
        for (let i = w; i < n; i++) {
            cur += arr[i] - arr[i - w];
            if (cur > maxSum) maxSum = cur;
        }
        out.push(maxSum);
    }
    console.log(out.join('\n'));
}

solve();
