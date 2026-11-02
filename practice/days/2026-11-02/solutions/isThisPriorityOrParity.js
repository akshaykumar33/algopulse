const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = BigInt(tokens[ptr++]);
        const k = BigInt(tokens[ptr++]);
        
        if (k === 1n) {
            if (n % 2n === 1n) {
                out.push('ODD');
            } else {
                out.push('EVEN');
            }
        } else if (k === 2n) {
            out.push('ODD');
        } else {
            out.push('EVEN');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
