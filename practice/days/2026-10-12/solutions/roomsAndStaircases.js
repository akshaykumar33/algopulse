const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    let lineIdx = 1;
    const out = [];
    for (let tIdx = 0; tIdx < t; tIdx++) {
        const n = parseInt(lines[lineIdx++], 10);
        const s = lines[lineIdx++];
        let ans = n;
        for (let i = 0; i < n; i++) {
            if (s[i] === '1') {
                const idx = i + 1;
                const val = 2 * Math.max(idx, n - idx + 1);
                if (val > ans) {
                    ans = val;
                }
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
