const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        if (lineIdx >= lines.length) break;
        const [n, m] = lines[lineIdx++].trim().split(/\s+/).map(Number);
        const arr = lines[lineIdx++].trim().split(/\s+/).map(Number);
        
        for (let j = 0; j < m; j++) {
            const [l, r] = lines[lineIdx++].trim().split(/\s+/).map(Number);
            for (let k = 0; k < n; k++) {
                if (arr[k] < l) {
                    arr[k] = l;
                } else if (arr[k] > r) {
                    arr[k] = r;
                }
            }
        }
        out.push(arr.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
