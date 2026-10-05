const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const res = [];
    for (let i = 1; i <= t; i++) {
        const [l, v1, v2] = lines[i].split(/\s+/).map(Number);
        const t1 = Math.ceil(l / v1);
        const t2 = Math.ceil(l / v2);
        res.push(t1 - t2 - 1);
    }
    console.log(res.join('\n'));
}

solve();
