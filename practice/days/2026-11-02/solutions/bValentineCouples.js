const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = new Array(n);
        for (let j = 0; j < n; j++) {
            a[j] = parseInt(tokens[ptr++], 10);
        }
        const b = new Array(n);
        for (let j = 0; j < n; j++) {
            b[j] = parseInt(tokens[ptr++], 10);
        }
        
        a.sort((x, y) => x - y);
        b.sort((x, y) => x - y);
        
        let ans = 0;
        for (let j = 0; j < n; j++) {
            const sum = a[j] + b[n - 1 - j];
            if (sum > ans) {
                ans = sum;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
