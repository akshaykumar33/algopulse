const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        let ok = true;
        let prevP = 0;
        let prevC = 0;
        for (let j = 0; j < n; j++) {
            const parts = lines[ptr++].trim().split(/\s+/);
            const p = parseInt(parts[0], 10);
            const c = parseInt(parts[1], 10);
            if (p < prevP || c < prevC || p < c) {
                ok = false;
            }
            if ((p - prevP) < (c - prevC)) {
                ok = false;
            }
            prevP = p;
            prevC = c;
        }
        out.push(ok ? "YES" : "NO");
    }
    console.log(out.join('\n'));
}

solve();
