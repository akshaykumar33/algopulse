const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const k = parseInt(lines[i], 10);
        let pos = 0;
        for (let j = 1; j <= k; j++) {
            if (j % 2 === 1) {
                pos += 3;
            } else {
                pos -= 1;
            }
        }
        out.push(pos);
    }
    console.log(out.join('\n'));
}

solve();
