const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        let n = parseInt(tokens[ptr++], 10);
        const factors = [];
        let d = 2;
        while (d * d <= n) {
            while (n % d === 0) {
                factors.push(d);
                n /= d;
            }
            d++;
        }
        if (n > 1) {
            factors.push(n);
        }
        out.push(factors.join(' '));
    }
    console.log(out.join('\n'));
}
solve();
