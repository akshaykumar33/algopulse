const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const s = input[ptr++];
        
        let count = 1;
        let cur = 1;
        const lim = Math.min(s.length, n - 1);
        for (let i = 0; i < lim; i++) {
            cur ^= (s.charCodeAt(i) - 48);
            if (cur === 1) count++;
        }
        
        out.push(Math.max(count, n - count));
    }
    
    console.log(out.join('\n'));
}

solve();
