const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = BigInt(tokens[ptr++]);
        let ans = 0n;
        
        const q = n / 4n;
        const r = Number(n % 4n);
        
        if (q > 0n) {
            ans += q * 44n + (q - 1n) * 4n;
        }
        
        if (r === 0) {
            if (q > 0n) {
                ans += 16n;
            }
        } else if (r === 1) {
            ans += 20n;
            if (q > 0n) {
                ans += 4n;
            }
        } else if (r === 2) {
            ans += 36n;
            if (q > 0n) {
                ans += 4n;
            }
        } else if (r === 3) {
            ans += 51n;
            if (q > 0n) {
                ans += 4n;
            }
        }
        
        out.push(ans.toString());
    }
    
    console.log(out.join('\n'));
}

solve();
