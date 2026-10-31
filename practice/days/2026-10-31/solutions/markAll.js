const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = [];
        let sum = 0n;
        for (let j = 0; j < n; j++) {
            const val = BigInt(tokens[ptr++]);
            a.push(val);
            sum += val;
        }
        
        a.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
        
        if (sum % 2n !== 0n) {
            out.push(sum.toString());
        } else {
            let found = false;
            for (let j = 0; j < n; j++) {
                if ((sum - a[j]) % 2n !== 0n) {
                    out.push((sum - a[j]).toString());
                    found = true;
                    break;
                }
            }
            if (!found) {
                out.push("0");
            }
        }
    }
    
    console.log(out.join('\n'));
}

solve();
