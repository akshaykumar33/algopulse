const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const x = parseInt(input[ptr++], 10);
        const n = parseInt(input[ptr++], 10);
        
        let ans = 1;
        for (let d = 1; d * d <= x; d++) {
            if (x % d === 0) {
                if (n <= x / d) {
                    ans = Math.max(ans, d);
                }
                if (n <= d) {
                    ans = Math.max(ans, x / d);
                }
            }
        }
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
