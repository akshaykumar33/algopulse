const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines || lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[0]);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[i]);
        let ans = 0;
        for (let j = 1; j <= n; j++) {
            ans += j * j;
        }
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
