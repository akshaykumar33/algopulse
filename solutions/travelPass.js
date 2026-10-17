const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0]);
    let idx = 1;
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const [n, a, b] = lines[idx++].split(' ').map(Number);
        const s = lines[idx++];
        let ans = 0;
        for (let j = 0; j < n; j++) {
            if (s[j] === '0') {
                ans += a;
            } else {
                ans += b;
            }
        }
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
