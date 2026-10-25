const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[lineIdx++], 10);
        const a = lines[lineIdx++].split(/\s+/).map(Number);
        
        let minVal = a[0];
        let minIdx = 0;
        for (let j = 1; j < n; j++) {
            if (a[j] < minVal) {
                minVal = a[j];
                minIdx = j;
            }
        }
        
        let possible = true;
        for (let j = minIdx + 1; j < n; j++) {
            if (a[j] < a[j - 1]) {
                possible = false;
                break;
            }
        }
        
        if (!possible) {
            out.push(-1);
        } else {
            out.push(minIdx);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
