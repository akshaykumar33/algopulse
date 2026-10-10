const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let lineIdx = 0;
    if (lineIdx >= lines.length || lines[0] === '') return;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const [n, k] = lines[lineIdx++].split(/\s+/).map(Number);
        const arr = lines[lineIdx++].split(/\s+/).map(Number);
        let cur = 0;
        let failed = false;
        let failDay = -1;
        for (let j = 0; j < n; j++) {
            cur += arr[j];
            if (cur < k) {
                failed = true;
                failDay = j + 1;
                break;
            }
            cur -= k;
        }
        if (failed) {
            out.push('NO ' + failDay);
        } else {
            out.push('YES');
        }
    }
    console.log(out.join('\n'));
}

solve();
