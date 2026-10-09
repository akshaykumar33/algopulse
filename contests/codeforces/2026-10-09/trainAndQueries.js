const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let lineIdx = 0;
    if (lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        lineIdx++; 
        const [n, k] = lines[lineIdx++].split(' ').map(Number);
        const u = lines[lineIdx++].split(' ').map(Number);
        
        const first = new Map();
        const last = new Map();
        
        for (let j = 0; j < n; j++) {
            const val = u[j];
            if (!first.has(val)) {
                first.set(val, j);
            }
            last.set(val, j);
        }
        
        for (let j = 0; j < k; j++) {
            const [a, b] = lines[lineIdx++].split(' ').map(Number);
            if (first.has(a) && last.has(b) && first.get(a) <= last.get(b)) {
                out.push("YES");
            } else {
                out.push("NO");
            }
        }
    }
    
    console.log(out.join('\n'));
}

solve();
