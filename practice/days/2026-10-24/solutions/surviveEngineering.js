const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0]);
    const out = [];
    let lineIdx = 1;
    for (let i = 0; i < t; i++) {
        const [n, x] = lines[lineIdx++].split(' ').map(Number);
        const a = lines[lineIdx++].split(' ').map(Number);
        a.sort((p, q) => p - q);
        let cur = x;
        let ok = true;
        for (let j = 0; j < n; j++) {
            if (a[j] <= cur) {
                cur -= a[j];
            } else {
                ok = false;
                break;
            }
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
