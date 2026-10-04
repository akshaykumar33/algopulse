const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const parts = lines[i].split(' ').map(Number);
        const x1 = parts[0];
        const y1 = parts[1];
        const x2 = parts[2];
        const y2 = parts[3];
        if (x1 === x2 || y1 === y2) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
