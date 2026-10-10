const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        const arr = lines[ptr++].trim().split(/\s+/).map(Number);
        
        let maxSum = -Infinity;
        for (let j = 0; j < n; j++) {
            const curSum = arr[j] + arr[(j + 1) % n];
            if (curSum > maxSum) {
                maxSum = curSum;
            }
        }
        out.push(maxSum);
    }
    
    console.log(out.join('\n'));
}

solve();
