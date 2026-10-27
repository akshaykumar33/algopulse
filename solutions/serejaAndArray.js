const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    
    const a = new Array(n + 1);
    for (let i = 1; i <= n; i++) {
        a[i] = parseInt(tokens[ptr++], 10);
    }
    
    let delta = 0;
    const out = [];
    
    for (let i = 0; i < m; i++) {
        const type = parseInt(tokens[ptr++], 10);
        if (type === 1) {
            const v = parseInt(tokens[ptr++], 10);
            const x = parseInt(tokens[ptr++], 10);
            a[v] = x - delta;
        } else if (type === 2) {
            const y = parseInt(tokens[ptr++], 10);
            delta += y;
        } else if (type === 3) {
            const v = parseInt(tokens[ptr++], 10);
            out.push(a[v] + delta);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
