const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const memo = new Map();

    function getBest(n) {
        if (n === 0) return 0;
        if (memo.has(n)) return memo.get(n);
        const sum = getBest(Math.floor(n / 2)) + getBest(Math.floor(n / 3)) + getBest(Math.floor(n / 4));
        const res = Math.max(n, sum);
        memo.set(n, res);
        return res;
    }

    const out = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;
        const n = parseInt(lines[i], 10);
        out.push(getBest(n));
    }
    console.log(out.join('\n'));
}

solve();
