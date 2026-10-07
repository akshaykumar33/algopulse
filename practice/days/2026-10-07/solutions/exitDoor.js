const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines || lines.length === 0 || lines[0] === '') return;
    let idx = 0;
    const t = parseInt(lines[idx++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[idx++], 10);
        const arr = lines[idx++].split(' ').map(Number);
        let ans = 0;
        for (let j = 0; j < n; j++) {
            ans += arr[j];
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
