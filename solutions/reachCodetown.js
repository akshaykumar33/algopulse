const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const vowels = new Set(['A', 'E', 'I', 'O', 'U']);
    const vIdx = new Set([1, 3, 5]);
    const res = [];
    for (let i = 1; i <= t; i++) {
        const cur = lines[i];
        let ok = true;
        for (let j = 0; j < 8; j++) {
            if (vowels.has(cur[j]) !== vIdx.has(j)) {
                ok = false;
                break;
            }
        }
        res.push(ok ? "YES" : "NO");
    }
    console.log(res.join('\n'));
}

solve();
