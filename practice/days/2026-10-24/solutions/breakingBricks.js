const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const s = parseInt(input[ptr++], 10);
        const w1 = parseInt(input[ptr++], 10);
        const w2 = parseInt(input[ptr++], 10);
        const w3 = parseInt(input[ptr++], 10);
        
        if (w1 + w2 + w3 <= s) {
            out.push(1);
        } else if (w1 + w2 <= s || w2 + w3 <= s) {
            out.push(2);
        } else {
            out.push(3);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
