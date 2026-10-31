const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const res = new Array(n);
        let left = 0, right = n - 1;
        let val = 1;
        
        for (let j = 0; j < n; j++) {
            if (j % 2 === 0) {
                res[left++] = val++;
            } else {
                res[right--] = val++;
            }
        }
        out.push(res.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
