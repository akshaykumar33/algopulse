const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0]);
    const out = [];
    for (let i = 1; i <= t; i++) {
        let s = parseInt(lines[i]);
        let ans = 0;
        while (s >= 10) {
            let d = Math.floor(s / 10) * 10;
            ans += d;
            s = s - d + Math.floor(d / 10);
        }
        ans += s;
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
