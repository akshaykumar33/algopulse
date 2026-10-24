const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const [n, x] = lines[ptr++].split(/\s+/).map(Number);
        const a = lines[ptr++].split(/\s+/).map(Number);
        
        let maxVal = 0;
        let sum = 0n;
        for (let j = 0; j < n; j++) {
            if (a[j] > maxVal) maxVal = a[j];
            sum += BigInt(a[j]);
        }
        
        let ans = BigInt(maxVal);
        let minDays = (sum + BigInt(x) - 1n) / BigInt(x);
        if (minDays > ans) {
            ans = minDays;
        }
        
        out.push(ans.toString());
    }
    
    console.log(out.join('\n'));
}

solve();
