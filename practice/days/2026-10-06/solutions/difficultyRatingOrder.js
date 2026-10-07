const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[0], 10);
    let lineIdx = 1;
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[lineIdx++], 10);
        const arr = lines[lineIdx++].split(' ').map(Number);
        
        let ok = true;
        for (let j = 1; j < n; j++) {
            if (arr[j] < arr[j - 1]) {
                ok = false;
                break;
            }
        }
        
        out.push(ok ? 'Yes' : 'No');
    }
    
    console.log(out.join('\n'));
}

solve();
