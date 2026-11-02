const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const tokens = input.trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    
    const n = parseInt(tokens[ptr++], 10);
    const a = new Array(n);
    let minVal = Infinity;
    
    for (let i = 0; i < n; i++) {
        a[i] = parseInt(tokens[ptr++], 10);
        if (a[i] < minVal) {
            minVal = a[i];
        }
    }
    
    let maxGap = 0;
    let currentGap = 0;
    let firstIdx = -1;
    let lastIdx = -1;
    
    for (let i = 0; i < n; i++) {
        if (a[i] === minVal) {
            if (firstIdx === -1) {
                firstIdx = i;
            }
            lastIdx = i;
        }
    }
    
    let count = 0;
    let maxConsecutive = 0;
    let consecutive = 0;
    
    const extended = new Array(2 * n);
    for (let i = 0; i < 2 * n; i++) {
        extended[i] = a[i % n];
    }
    
    for (let i = 0; i < 2 * n; i++) {
        if (extended[i] === minVal) {
            maxConsecutive = Math.max(maxConsecutive, consecutive);
            consecutive = 0;
        } else {
            consecutive++;
        }
    }
    
    const ans = BigInt(minVal) * BigInt(n) + BigInt(maxConsecutive);
    console.log(ans.toString());
}

solve();
