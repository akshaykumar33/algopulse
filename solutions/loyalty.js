const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++], 10);
        const x = BigInt(lines[ptr++]);
        const a = [];
        for (let i = 0; i < n; i++) {
            a.push(BigInt(lines[ptr++]));
        }
        a.sort((u, v) => (u < v ? -1 : u > v ? 1 : 0));

        let sum = 0n;
        let left = 0;
        let right = n - 1;
        let total = 0n;
        const w = [];

        while (left <= right) {
            if ((sum + a[right]) / x > sum / x) {
                total += a[right];
                w.push(a[right].toString());
                sum += a[right--];
            } else {
                w.push(a[left].toString());
                sum += a[left++];
            }
        }
        out.push(total.toString());
        out.push(w.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
