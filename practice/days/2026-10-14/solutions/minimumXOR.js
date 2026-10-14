const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines || lines.length === 0 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        const arr = lines[ptr++].trim().split(/\s+/).map(Number);
        let total = 0;
        for (let j = 0; j < n; j++) {
            total ^= arr[j];
        }
        let ans = total;
        for (let j = 0; j < n; j++) {
            ans = Math.min(ans, total ^ arr[j]);
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
