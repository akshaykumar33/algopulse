const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines.length || lines[0] === '') return;
    const t = parseInt(lines[0]);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const [n, a] = lines[i].split(/\s+/).map(Number);
        const uninfected = n - a;
        out.push(Math.min(a, uninfected));
    }
    console.log(out.join('\n'));
}

solve();
