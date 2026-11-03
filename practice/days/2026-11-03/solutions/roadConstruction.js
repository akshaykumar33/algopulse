const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const hasForbidden = new Uint8Array(n + 1);
    for (let i = 0; i < m; i++) {
        const u = parseInt(tokens[ptr++], 10);
        const v = parseInt(tokens[ptr++], 10);
        hasForbidden[u] = 1;
        hasForbidden[v] = 1;
    }
    let hub = 1;
    for (let i = 1; i <= n; i++) {
        if (!hasForbidden[i]) {
            hub = i;
            break;
        }
    }
    console.log(n - 1);
    const out = [];
    for (let i = 1; i <= n; i++) {
        if (i !== hub) out.push(`${hub} ${i}`);
    }
    console.log(out.join('\n'));
}
solve();
