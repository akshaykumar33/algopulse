const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    function countBits(val) {
        if (val <= 1n) return 0n;
        let res = 0n;
        let cur = 1n;
        while (cur < val) {
            cur <<= 1n;
            res++;
        }
        return res;
    }

    for (let tc = 0; tc < t; tc++) {
        const n = BigInt(lines[ptr++]);
        const m = BigInt(lines[ptr++]);
        const a = BigInt(lines[ptr++]);
        const b = BigInt(lines[ptr++]);

        const optA1 = a;
        const optA2 = n - a + 1n;
        const minA = optA1 < optA2 ? optA1 : optA2;
        const maxA = optA1 > optA2 ? optA1 : optA2;

        const optB1 = b;
        const optB2 = m - b + 1n;
        const minB = optB1 < optB2 ? optB1 : optB2;
        const maxB = optB1 > optB2 ? optB1 : optB2;

        // Choice 1: cut row first
        const cutsRowFirst = 1n + countBits(minA) + countBits(m);
        // Choice 2: cut col first
        const cutsColFirst = 1n + countBits(minB) + countBits(n);

        const ans = cutsRowFirst < cutsColFirst ? cutsRowFirst : cutsColFirst;
        out.push(ans.toString());
    }
    console.log(out.join('\n'));
}

solve();
