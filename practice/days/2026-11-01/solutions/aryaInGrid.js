const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = BigInt(tokens[ptr++]);
        const m = BigInt(tokens[ptr++]);
        const x = BigInt(tokens[ptr++]);
        const y = BigInt(tokens[ptr++]);
        const L = BigInt(tokens[ptr++]);
        
        const left = (x - 1n) / L;
        const right = (n - x) / L;
        const rows = left + right + 1n;
        
        const down = (y - 1n) / L;
        const up = (m - y) / L;
        const cols = down + up + 1n;
        
        out.push((rows * cols).toString());
    }
    
    console.log(out.join('\n'));
}

solve();
