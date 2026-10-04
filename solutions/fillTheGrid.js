const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const [n, m] = lines[i].split(' ').map(Number);
        let ans = 0;
        if (n % 2 !== 0 && m % 2 !== 0) {
            ans = n + m - 1;
        } else if (n % 2 !== 0) {
            ans = m;
        } else if (m % 2 !== 0) {
            ans = n;
        } else {
            ans = 0;
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
