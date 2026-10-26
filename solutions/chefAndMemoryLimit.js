const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        let prev = 0;
        let ans = 0;
        for (let i = 0; i < n; i++) {
            const m = parseInt(input[ptr++], 10);
            if (m > prev) {
                ans += (m - prev);
            }
            prev = m;
        }
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
