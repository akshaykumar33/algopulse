const fs = require('fs');

function gcd(a, b) {
    while (b) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).filter(Boolean);
    if (!input || input.length === 0) return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const k = BigInt(input[ptr++]);

        let p = 2n;
        while (gcd(p, k) > 1n) {
            p++;
        }

        const res = new Array(n);
        for (let i = 0; i < n; i++) {
            let x = BigInt(input[ptr++]);
            while (x % p !== 0n) {
                x += k;
            }
            res[i] = x.toString();
        }
        out.push(res.join(' '));
    }

    console.log(out.join('\n'));
}

solve();
