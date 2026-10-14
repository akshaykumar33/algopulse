const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[lineIdx++], 10);
        const arr = lines[lineIdx++].split(/\s+/).map(Number);
        const seen = new Set();
        let ok = false;
        for (let j = 0; j < n; j++) {
            if (seen.has(arr[j])) {
                ok = true;
                break;
            }
            seen.add(arr[j]);
        }
        if (ok) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
