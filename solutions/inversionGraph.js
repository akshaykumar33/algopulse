const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[lineIdx++], 10);
        const p = lines[lineIdx++].split(' ').map(Number);
        
        let ans = 0;
        let maxVal = 0;
        
        for (let i = 0; i < n; i++) {
            maxVal = Math.max(maxVal, p[i]);
            if (maxVal === i + 1) {
                ans++;
            }
        }
        
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
