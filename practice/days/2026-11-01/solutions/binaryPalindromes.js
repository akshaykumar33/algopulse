const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const q = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let qi = 0; qi < q; qi++) {
        const n = parseInt(tokens[ptr++], 10);
        const lens = new Array(n);
        let zeros = 0;
        let ones = 0;
        let hasOddLength = false;

        for (let i = 0; i < n; i++) {
            const s = tokens[ptr++];
            lens[i] = s.length;
            if (lens[i] % 2 === 1) {
                hasOddLength = true;
            }
            for (let j = 0; j < s.length; j++) {
                if (s[j] === '0') zeros++;
                else ones++;
            }
        }

        if (hasOddLength) {
            out.push(n);
        } else {
            if (zeros % 2 === 0 && ones % 2 === 0) {
                out.push(n);
            } else {
                out.push(n - 1);
            }
        }
    }

    console.log(out.join('\n'));
}

solve();
