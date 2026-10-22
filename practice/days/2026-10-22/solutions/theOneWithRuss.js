const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++]);
    const out = [];
    for (let test = 0; test < t; test++) {
        const [n, x, k] = lines[ptr++].split(/\s+/).map(Number);
        const a = lines[ptr++].split(/\s+/).map(Number);
        const b = lines[ptr++].split(/\s+/).map(Number);
        let cnt = 0;
        for (let i = 0; i < n; i++) {
            if (Math.abs(a[i] - b[i]) <= x) {
                cnt++;
            }
        }
        if (cnt >= k) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    console.log(out.join('\n'));
}

solve();
