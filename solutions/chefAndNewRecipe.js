const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(input[ptr++], 10);
        let possible = true;
        let sum = 0;
        let min = Infinity;
        
        for (let j = 0; j < n; j++) {
            const val = parseInt(input[ptr++], 10);
            if (val < 2) {
                possible = false;
            }
            sum += val;
            if (val < min) {
                min = val;
            }
        }
        
        if (!possible) {
            out.push(-1);
        } else {
            out.push(sum - min + 2);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
