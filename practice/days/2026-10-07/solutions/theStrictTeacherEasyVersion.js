const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let ptr = 0;
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const [n, m, q] = lines[ptr++].split(/\s+/).map(Number);
        const b = lines[ptr++].split(/\s+/).map(Number);
        const a = lines[ptr++].split(/\s+/).map(Number);
        b.sort((x, y) => x - y);
        const pos = a[0];
        if (pos < b[0]) {
            out.push(b[0] - 1);
        } else if (pos > b[1]) {
            out.push(n - b[1]);
        } else {
            out.push(Math.floor((b[1] - b[0]) / 2));
        }
    }
    console.log(out.join('\n'));
}

solve();
