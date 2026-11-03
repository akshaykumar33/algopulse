const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = BigInt(tokens[ptr++]);
    const m = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < m; i++) {
        const q = BigInt(tokens[ptr++]);
        if (q < n + 2n || q > 3n * n) {
            out.push('0');
        } else if (q <= 2n * n + 1n) {
            out.push((q - (n + 1n)).toString());
        } else {
            out.push((3n * n - q + 1n).toString());
        }
    }
    console.log(out.join('\n'));
}
solve();
