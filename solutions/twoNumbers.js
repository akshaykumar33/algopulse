const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const [a, b, n] = lines[i].split(/\s+/).map(Number);
        let A = a;
        let B = b;
        if (n % 2 === 1) {
            A *= 2;
        }
        const maxVal = Math.max(A, B);
        const minVal = Math.min(A, B);
        out.push(Math.floor(maxVal / minVal));
    }
    console.log(out.join('\n'));
}

solve();
