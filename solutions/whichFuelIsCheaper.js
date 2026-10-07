const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        if (!lines[i]) continue;
        const [x, y, a, b, k] = lines[i].split(/\s+/).map(Number);
        const p = x + a * k;
        const d = y + b * k;
        if (p < d) {
            out.push("PETROL");
        } else if (p > d) {
            out.push("DIESEL");
        } else {
            out.push("SAME");
        }
    }
    console.log(out.join('\n'));
}

solve();
