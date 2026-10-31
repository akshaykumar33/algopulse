const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const X = tokens[ptr++];
        const Y = tokens[ptr++];
        const n = X.length;
        let res = '';
        
        for (let j = 0; j < n; j++) {
            const c1 = X[j];
            const c2 = Y[j];
            if (c1 === c2) {
                res += (c1 === 'B' ? 'W' : 'B');
            } else {
                res += 'B';
            }
        }
        out.push(res);
    }
    
    console.log(out.join('\n'));
}

solve();
