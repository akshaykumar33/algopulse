const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const x = parseInt(lines[i], 10);
        if (x % 10 === 0) {
            out.push(0);
        } else if (x % 5 === 0) {
            out.push(1);
        } else {
            out.push(-1);
        }
    }
    console.log(out.join('\n'));
}

solve();
