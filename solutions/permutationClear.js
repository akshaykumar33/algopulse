const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(input[ptr++], 10);
        const a = input[ptr++].split(' ').map(Number);
        const k = parseInt(input[ptr++], 10);
        const b = input[ptr++].split(' ').map(Number);
        
        const removeSet = new Set(b);
        const res = [];
        
        for (let j = 0; j < n; j++) {
            if (!removeSet.has(a[j])) {
                res.push(a[j]);
            }
        }
        
        out.push(res.join(' '));
    }
    
    console.log(out.join('\n'));
}

solve();
