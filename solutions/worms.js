const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let ptr = 0;
    const n = parseInt(input[ptr++], 10);
    const a = new Array(n);
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += parseInt(input[ptr++], 10);
        a[i] = sum;
    }
    
    const m = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < m; i++) {
        const q = parseInt(input[ptr++], 10);
        let low = 0, high = n - 1;
        let ans = 0;
        while (low <= high) {
            const mid = (low + high) >> 1;
            if (a[mid] >= q) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        out.push(ans + 1);
    }
    
    console.log(out.join('\n'));
}

solve();
