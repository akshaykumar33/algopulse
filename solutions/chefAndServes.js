const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const parts = lines[i].trim().split(/\s+/);
        const p1 = parseInt(parts[0], 10);
        const p2 = parseInt(parts[1], 10);
        const k = parseInt(parts[2], 10);
        const total = p1 + p2;
        const block = Math.floor(total / k);
        if (block % 2 === 0) {
            out.push("CHEF");
        } else {
            out.push("COOK");
        }
    }
    console.log(out.join('\n'));
}

solve();
