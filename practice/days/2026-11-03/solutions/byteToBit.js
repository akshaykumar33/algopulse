const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10) - 1;
        const cycle = Math.floor(n / 26);
        const rem = n % 26;
        const count = 1n << BigInt(cycle);
        
        if (rem < 2) {
            out.push(`${count} 0 0`);
        } else if (rem < 10) {
            out.push(`0 ${count} 0`);
        } else {
            out.push(`0 0 ${count}`);
        }
    }
    console.log(out.join('\n'));
}

solve();
