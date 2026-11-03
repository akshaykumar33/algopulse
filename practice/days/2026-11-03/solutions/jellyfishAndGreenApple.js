const fs = require('fs');
function gcd(a, b) {
    while (b > 0) {
        const r = a % b;
        a = b;
        b = r;
    }
    return a;
}
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        let n = parseInt(tokens[ptr++], 10);
        const m = parseInt(tokens[ptr++], 10);
        n %= m;
        const g = gcd(n, m);
        const remM = Math.floor(m / g);
        if ((remM & (remM - 1)) !== 0) {
            out.push('-1');
            continue;
        }
        let ans = 0n;
        while (n > 0) {
            ans += BigInt(n);
            n = (n * 2) % m;
        }
        out.push(ans.toString());
    }
    console.log(out.join('\n'));
}
solve();
