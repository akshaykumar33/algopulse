const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(input[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const [x1, x2] = input[i].split(' ').map(Number);
        if (x1 >= x2) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    console.log(out.join('\n'));
}

solve();
