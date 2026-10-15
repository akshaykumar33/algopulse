const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let idx = 0;
    const t = parseInt(lines[idx++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const [n, k] = lines[idx++].split(/\s+/).map(Number);
        const arr = lines[idx++].split(/\s+/).map(Number);
        let res = '';
        for (let j = 0; j < n; j++) {
            if (arr[j] % k === 0) {
                res += '1';
            } else {
                res += '0';
            }
        }
        out.push(res);
    }
    console.log(out.join('\n'));
}

solve();
