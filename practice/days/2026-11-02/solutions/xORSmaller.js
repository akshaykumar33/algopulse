const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = new Array(n);
        for (let j = 0; j < n; j++) {
            arr[j] = parseInt(tokens[ptr++], 10);
        }
        
        let totalXor = 0;
        for (let j = 0; j < n; j++) {
            totalXor ^= arr[j];
        }
        
        let ans = totalXor;
        for (let j = 0; j < n; j++) {
            ans = Math.min(ans, totalXor ^ arr[j]);
        }
        
        let can = 0;
        for (let j = 0; j < n; j++) {
            can |= arr[j];
        }
        
        let minVal = ans;
        for (let bit = 30; bit >= 0; bit--) {
            if ((can & (1 << bit)) !== 0) {
                if ((minVal & (1 << bit)) !== 0) {
                    minVal ^= (1 << bit);
                }
            }
        }
        
        out.push(minVal);
    }
    
    console.log(out.join('\n'));
}

solve();
