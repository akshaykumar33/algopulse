const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        const arr = lines[ptr++].split(/\s+/).map(Number);
        let ans = 0;
        let cur = 0;
        for (let j = 0; j < n; j++) {
            cur |= arr[j];
            ans = Math.max(ans, cur);
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
