const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = [];
        let sum = 0n;
        for (let j = 0; j < n; j++) {
            const val = BigInt(tokens[ptr++]);
            arr.push(val);
            sum += val;
        }
        
        const s = sum / BigInt(n - 1);
        const res = [];
        for (let j = 0; j < n; j++) {
            res.push((s - arr[j]).toString());
        }
        out.push(res.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
