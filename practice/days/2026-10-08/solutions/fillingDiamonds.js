const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        out.push(lines[i]);
    }
    console.log(out.join('\n'));
}

solve();
