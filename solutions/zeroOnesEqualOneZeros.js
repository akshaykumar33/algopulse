const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0].trim(), 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[i].trim(), 10);
        let res = '';
        if (n % 2 === 1) {
            const mid = Math.floor(n / 2);
            for (let j = 0; j < n; j++) {
                res += (j === mid ? '1' : '0');
            }
        } else {
            const mid1 = n / 2 - 1;
            const mid2 = n / 2;
            for (let j = 0; j < n; j++) {
                res += (j === mid1 || j === mid2 ? '1' : '0');
            }
        }
        out.push(res);
    }
    console.log(out.join('\n'));
}

solve();
