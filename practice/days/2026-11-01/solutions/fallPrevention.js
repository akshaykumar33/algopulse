const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = [];
        for (let j = 0; j < n; j++) {
            a.push(parseInt(tokens[ptr++], 10));
        }
        let ok = true;
        for (let j = 0; j < n - 1; j++) {
            if (a[j] > a[j + 1]) {
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
