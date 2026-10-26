const fs = require('fs');

function comb(n, k) {
    if (k > n || k < 0) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) {
        res = (res * (n - i + 1)) / i;
    }
    return Math.round(res);
}

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 1) return;
    const first = lines[0].trim().split(/\s+/);
    const x = parseInt(first[0], 10);
    const n = parseInt(first[1], 10);

    let total = 0;
    for (let c = 1; c <= n; c++) {
        const s = lines[c].trim();
        for (let i = 0; i < 9; i++) {
            let free = 0;
            for (let j = 0; j < 4; j++) {
                if (s[4 * i + j] === '0') free++;
            }
            if (s[54 - 2 * (i + 1)] === '0') free++;
            if (s[54 - 2 * (i + 1) + 1] === '0') free++;
            total += comb(free, x);
        }
    }
    console.log(total);
}

solve();
