const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[i], 10);
        if (n === 1 || n === 3 || n === 5) {
            out.push("NO");
        } else {
            out.push("YES");
        }
    }
    console.log(out.join('\n'));
}

solve();
