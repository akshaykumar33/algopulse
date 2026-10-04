const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    const dirs = ['North', 'East', 'South', 'West'];
    for (let i = 1; i <= t; i++) {
        const x = parseInt(lines[i], 10);
        out.push(dirs[x % 4]);
    }
    console.log(out.join('\n'));
}

solve();
