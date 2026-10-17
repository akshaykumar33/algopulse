const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const parts = input[ptr++].trim().split(/\s+/);
        const n = parseInt(parts[0], 10);
        const x = BigInt(parts[1]);
        const arr = input[ptr++].trim().split(/\s+/).map(Number);
        
        const L = new Array(n).fill(1);
        for (let i = 1; i < n; i++) {
            if (arr[i] >= arr[i - 1]) {
                L[i] = L[i - 1] + 1;
            }
        }
        
        const R = new Array(n).fill(1);
        for (let i = n - 2; i >= 0; i--) {
            if (arr[i] <= arr[i + 1]) {
                R[i] = R[i + 1] + 1;
            }
        }
        
        let ans = 0;
        for (let i = 0; i < n; i++) {
            if (L[i] > ans) ans = L[i];
        }
        
        for (let i = 0; i < n; i++) {
            const orig = BigInt(arr[i]);
            const mod = orig * x;
            
            let leftLen = 0;
            if (i === 0) {
                leftLen = 0;
            } else if (BigInt(arr[i - 1]) <= mod) {
                leftLen = L[i - 1];
            }
            
            let rightLen = 0;
            if (i === n - 1) {
                rightLen = 0;
            } else if (mod <= BigInt(arr[i + 1])) {
                rightLen = R[i + 1];
            }
            
            const cur = 1 + leftLen + rightLen;
            if (cur > ans) ans = cur;
        }
        
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
