const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const m = parseInt(tokens[ptr++], 10);
        const r1 = parseInt(tokens[ptr++], 10);
        const c1 = parseInt(tokens[ptr++], 10);
        const r2 = parseInt(tokens[ptr++], 10);
        const c2 = parseInt(tokens[ptr++], 10);
        
        const dr = Math.abs(r1 - r2);
        const dc = Math.abs(c1 - c2);
        
        let ans = 0;
        if (dr > dc) {
            ans = Math.max(r1 - 1, n - r1);
        } else if (dc > dr) {
            ans = Math.max(c1 - 1, m - c1);
        } else {
            ans = Math.max(Math.max(r1 - 1, n - r1), Math.max(c1 - 1, m - c1));
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
