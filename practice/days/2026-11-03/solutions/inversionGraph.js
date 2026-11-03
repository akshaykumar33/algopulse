const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        let maxVal = 0;
        let components = 0;
        
        for (let j = 1; j <= n; j++) {
            const val = parseInt(tokens[ptr++], 10);
            if (val > maxVal) {
                maxVal = val;
            }
            if (maxVal === j) {
                components++;
            }
        }
        out.push(components);
    }
    
    console.log(out.join('\n'));
}

solve();
