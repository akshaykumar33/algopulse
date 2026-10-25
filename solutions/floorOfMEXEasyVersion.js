const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines || lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[0]);
    let idx = 1;
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[idx++]);
        const a = lines[idx++].split(' ').map(Number);
        
        let maxVal = 0;
        for (let i = 0; i < n; i++) {
            if (a[i] > maxVal) maxVal = a[i];
        }
        
        let mex = 0;
        const present = new Set(a);
        while (present.has(mex)) {
            mex++;
        }
        
        out.push(mex);
    }
    
    console.log(out.join('\n'));
}

solve();
