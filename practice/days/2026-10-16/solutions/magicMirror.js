const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines.length || lines[0] === '') return;
    let start = 0;
    let t = 1;
    const firstVal = parseInt(lines[0], 10);
    if (lines.length > 1 && lines.length === firstVal + 1) {
        t = firstVal;
        start = 1;
    } else if (lines.length > 1) {
        t = lines.length;
        start = 0;
    }
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[start + i], 10);
        if (n % 2 === 0) {
            out.push("EVEN");
        } else {
            out.push("ODD");
        }
    }
    console.log(out.join('\n'));
}

solve();
