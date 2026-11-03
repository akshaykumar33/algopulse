const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const r = parseInt(tokens[ptr++], 10);
        let minVal = -Infinity;
        let maxVal = Infinity;
        let ok = true;
        for (let i = 0; i < n; i++) {
            const x = parseInt(tokens[ptr++], 10);
            if (x < minVal || x > maxVal) {
                ok = false;
            }
            if (x < r) {
                if (x > minVal) minVal = x;
            } else if (x > r) {
                if (x < maxVal) maxVal = x;
            }
        }
        out.push(ok ? 'YES' : 'NO');
    }
    console.log(out.join('\n'));
}
solve();
