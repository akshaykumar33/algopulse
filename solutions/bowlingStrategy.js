const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(input[ptr++], 10);
        const k = parseInt(input[ptr++], 10);
        const l = parseInt(input[ptr++], 10);
        
        if (n > k * l || (k === 1 && n > 1)) {
            out.push('-1');
        } else {
            const res = [];
            for (let j = 0; j < n; j++) {
                res.push((j % k) + 1);
            }
            out.push(res.join(' '));
        }
    }
    
    console.log(out.join('\n'));
}

solve();
