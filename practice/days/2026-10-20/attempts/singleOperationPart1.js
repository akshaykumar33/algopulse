const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines.length || lines[0] === '') return;
    
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[2 * i - 1], 10);
        const s = lines[2 * i];
        let ans = 0;
        while (ans < n && s[ans] === '1') {
            ans++;
        }
        if (ans === 0) ans = 1;
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
