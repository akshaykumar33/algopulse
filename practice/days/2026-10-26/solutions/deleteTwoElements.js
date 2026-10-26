const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[lineIdx++], 10);
        const a = lines[lineIdx++].trim().split(/\s+/).map(Number);
        
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += a[i];
        }
        
        const totalSum2 = sum * 2;
        if (totalSum2 % n !== 0) {
            out.push(0);
            continue;
        }
        
        const targetSum = totalSum2 / n;
        const freq = new Map();
        let ans = 0;
        
        for (let i = 0; i < n; i++) {
            const needed = targetSum - a[i];
            if (freq.has(needed)) {
                ans += freq.get(needed);
            }
            freq.set(a[i], (freq.get(a[i]) || 0) + 1);
        }
        
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
