const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++], 10);
        let sum = 0;
        const a = [];
        for (let i = 0; i < n; i++) {
            const v = parseInt(lines[ptr++], 10);
            a.push(v);
            sum += v;
        }
        if (sum % n !== 0) {
            out.push('No');
            continue;
        }
        const target = sum / n;
        let ok = true;
        for (let i = 0; i < n; i++) {
            if (Math.abs(a[i] - target) % 2 !== 0) {
                ok = false;
                break;
            }
        }
        out.push(ok ? 'Yes' : 'No');
    }
    console.log(out.join('\n'));
}

solve();
