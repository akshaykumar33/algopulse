const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        let maxOdd = -1;
        let oddCount = 0;
        const evens = [];

        for (let i = 0; i < n; i++) {
            const v = parseInt(tokens[ptr++], 10);
            if (v % 2 !== 0) {
                oddCount++;
                if (maxOdd === -1 || v > maxOdd) maxOdd = v;
            } else {
                evens.push(v);
            }
        }

        if (oddCount === 0) {
            const zeros = new Array(n).fill(0);
            out.push(zeros.join(' '));
            continue;
        }

        evens.sort((a, b) => b - a);
        const numEvens = evens.length;
        const prefE = new Array(numEvens + 1);
        prefE[0] = 0;
        for (let i = 0; i < numEvens; i++) {
            prefE[i + 1] = prefE[i] + evens[i];
        }

        const res = [];
        for (let k = 1; k <= n; k++) {
            let L = k - 1 - numEvens;
            if (L < 0) L = 0;
            let uMin = L;
            if (uMin % 2 !== 0) uMin++;

            if (uMin <= oddCount - 1 && uMin <= k - 1) {
                const rem = k - 1 - uMin;
                const m = rem < numEvens ? rem : numEvens;
                const score = maxOdd + prefE[m];
                res.push(score);
            } else {
                res.push(0);
            }
        }

        out.push(res.join(' '));
    }

    console.log(out.join('\n'));
}

solve();
