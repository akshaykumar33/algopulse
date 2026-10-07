const fs = require('fs');

class Fenwick {
    constructor(n) {
        this.n = n;
        this.tree = new Int32Array(n + 1);
    }
    add(i, delta) {
        for (; i <= this.n; i += i & -i) this.tree[i] += delta;
    }
    query(i) {
        let sum = 0;
        for (; i > 0; i -= i & -i) sum += this.tree[i];
        return sum;
    }
}

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const pos = new Int32Array(n + 1);
        for (let i = 0; i < n; i++) {
            const p = parseInt(input[ptr++], 10);
            pos[p] = i + 1;
        }
        const bit = new Fenwick(n);
        for (let i = 1; i <= n; i++) bit.add(i, 1);
        let ans = 0;
        for (let x = n; x >= 1; x--) {
            const idx = pos[x];
            const L = bit.query(idx - 1);
            const R = (x - 1) - L;
            ans += Math.min(L, R);
            bit.add(idx, -1);
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
