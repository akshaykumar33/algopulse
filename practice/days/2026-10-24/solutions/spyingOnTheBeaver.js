const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const n = parseInt(lines[0]);
    const ans = [];
    for (let i = 1; i <= n; i++) {
        ans.push(i);
    }
    console.log(n);
    console.log(ans.join(' '));
}

solve();
