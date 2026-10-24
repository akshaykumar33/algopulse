const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const n = parseInt(lines[0], 10);
    const names = [];
    for (let i = 1; i <= n; i++) {
        names.push(lines[i]);
    }
    const seen = new Set();
    const ans = [];
    for (let i = n - 1; i >= 0; i--) {
        if (!seen.has(names[i])) {
            seen.add(names[i]);
            ans.push(names[i]);
        }
    }
    console.log(ans.join('\n'));
}

solve();
