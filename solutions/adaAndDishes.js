const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[lineIdx++], 10);
        const arr = lines[lineIdx++].split(' ').map(Number);
        arr.sort((a, b) => b - a);
        
        let b1 = 0;
        let b2 = 0;
        
        for (let j = 0; j < n; j++) {
            if (b1 <= b2) {
                b1 += arr[j];
            } else {
                b2 += arr[j];
            }
        }
        
        out.push(Math.max(b1, b2));
    }
    
    console.log(out.join('\n'));
}

solve();
