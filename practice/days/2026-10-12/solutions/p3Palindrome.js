const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const n = parseInt(lines[0], 10);
    const pattern = "aabb";
    const res = [];
    for (let i = 0; i < n; i++) {
        res.push(pattern[i % 4]);
    }
    console.log(res.join(''));
}

solve();
