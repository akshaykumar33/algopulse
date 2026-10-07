const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0]);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const [a, b, c] = lines[i].split(' ').map(Number);
        if (a > 50) {
            out.push('A');
        } else if (b > 50) {
            out.push('B');
        } else if (c > 50) {
            out.push('C');
        } else {
            out.push('NOTA');
        }
    }
    console.log(out.join('\n'));
}

solve();
