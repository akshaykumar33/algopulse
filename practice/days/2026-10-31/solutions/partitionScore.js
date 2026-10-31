const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const k = parseInt(tokens[ptr++], 10);
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(parseInt(tokens[ptr++], 10));
        }
        arr.sort((a, b) => a - b);
        
        let ans = 0;
        let maxVal = arr[n - 1];
        let secondMax = 0;
        
        if (k === 2) {
            secondMax = arr[n - 2];
            ans = maxVal + secondMax;
        } else {
            let max1 = arr[n - 1];
            let max2 = arr[n - 2];
            let max3 = arr[n - 3];
            ans = max1 + max2 + max3;
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
