const fs = require('fs');
function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const [x1, y1, x2, y2] = lines[i].split(' ').map(Number);
        const p1 = (x1 + y1) % 2;
        const p2 = (x2 + y2) % 2;
        if (p1 === p2) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    console.log(out.join('\n'));
}
solve();
