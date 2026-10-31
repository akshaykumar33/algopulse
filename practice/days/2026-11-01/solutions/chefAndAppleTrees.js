const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const s = new Set();
        for (let j = 0; j < n; j++) {
            s.add(parseInt(tokens[ptr++], 10));
        }
        out.push(s.size);
    }
    
    console.log(out.join('\n'));
}

solve();
