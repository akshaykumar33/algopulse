const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        let s = tokens[ptr++];
        let maxStr = s;
        for (let j = 0; j < n; j++) {
            let cur = s.substring(j) + s.substring(0, j);
            if (cur > maxStr) {
                maxStr = cur;
            }
        }
        out.push(maxStr);
    }
    console.log(out.join('\n'));
}
solve();
