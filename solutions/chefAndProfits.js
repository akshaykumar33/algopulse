const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const [x, y, z] = lines[i].split(' ').map(Number);
        const ans = x * (z - y);
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
