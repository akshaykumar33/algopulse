const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let idx = 0;
    const t = parseInt(lines[idx++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const [a, b, c] = lines[idx++].split(/\s+/).map(Number);
        if (a > Math.abs(b - c)) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
