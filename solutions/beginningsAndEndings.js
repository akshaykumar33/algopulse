const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines.length || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[i], 10);
        if (n === 2 || n === 3) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
