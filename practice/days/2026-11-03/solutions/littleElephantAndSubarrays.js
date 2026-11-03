const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(tokens[ptr++], 10));
    const q = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let qc = 0; qc < q; qc++) {
        const k = parseInt(tokens[ptr++], 10);
        let count = 0;
        for (let i = 0; i < n; i++) {
            let curMin = a[i];
            for (let j = i; j < n; j++) {
                if (a[j] < curMin) curMin = a[j];
                if (curMin === k) count++;
            }
        }
        out.push(count);
    }
    console.log(out.join('\n'));
}
solve();
