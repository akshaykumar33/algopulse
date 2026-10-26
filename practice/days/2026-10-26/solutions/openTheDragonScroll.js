const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 1 || lines[0] === '') return;
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];

    function countBits(x) {
        let cnt = 0;
        while (x > 0) {
            cnt += x & 1;
            x >>= 1;
        }
        return cnt;
    }

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[ptr++], 10);
        const a = parseInt(lines[ptr++], 10);
        const b = parseInt(lines[ptr++], 10);

        const onesA = countBits(a);
        const onesB = countBits(b);
        const zerosA = n - onesA;
        const zerosB = n - onesB;

        const maxOnes = Math.min(onesA, zerosB) + Math.min(onesB, zerosA);
        let ans = 0;
        for (let i = 0; i < maxOnes; i++) {
            ans |= (1 << (n - 1 - i));
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
