const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = new Int32Array(n);
        let minVal = Infinity;
        for (let i = 0; i < n; i++) {
            const v = parseInt(tokens[ptr++], 10);
            a[i] = v;
            if (v < minVal) minVal = v;
        }
        const b = new Int32Array(a);
        b.sort();
        let ok = true;
        for (let i = 0; i < n; i++) {
            if (a[i] !== b[i] && a[i] % minVal !== 0) {
                ok = false;
                break;
            }
        }
        out.push(ok ? 'YES' : 'NO');
    }
    console.log(out.join('\n'));
}
solve();
