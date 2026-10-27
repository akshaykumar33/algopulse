const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const p = new Array(n);
        for (let i = 0; i < n; i++) {
            p[i] = parseInt(tokens[ptr++], 10);
        }
        
        let ans = 0;
        for (let i = 0; i < n; i++) {
            let good = true;
            for (let j = Math.max(0, i - 5); j < i; j++) {
                if (p[j] <= p[i]) {
                    good = false;
                    break;
                }
            }
            if (good) {
                ans++;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
