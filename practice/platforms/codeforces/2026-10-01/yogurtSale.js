const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(input[ptr++], 10);
        const a = parseInt(input[ptr++], 10);
        const b = parseInt(input[ptr++], 10);
        
        if (2 * a <= b) {
            out.push(n * a);
        } else {
            out.push(Math.floor(n / 2) * b + (n % 2) * a);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
