const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 2 || lines[0] === '') return;
    const n = parseInt(lines[0], 10);
    const a = [];
    const count = new Map();

    for (let i = 0; i < n; i++) {
        const v = parseInt(lines[i + 1], 10);
        a.push(v);
        count.set(v, (count.get(v) || 0) + 1);
    }

    const pow2 = [];
    for (let k = 0; k <= 30; k++) {
        pow2.push(1 << k);
    }

    let del = 0;
    for (let i = 0; i < n; i++) {
        const x = a[i];
        let ok = false;
        for (let j = 0; j < pow2.length; j++) {
            const y = pow2[j] - x;
            if (y === x) {
                if (count.get(x) >= 2) {
                    ok = true;
                    break;
                }
            } else if (count.has(y)) {
                ok = true;
                break;
            }
        }
        if (!ok) del++;
    }
    console.log(del);
}

solve();
