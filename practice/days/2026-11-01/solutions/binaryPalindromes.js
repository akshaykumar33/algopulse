const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const q = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let qi = 0; qi < q; qi++) {
        const n = parseInt(tokens[ptr++], 10);
        let oddCount = 0;
        let totalZeros = 0;
        let totalOnes = 0;

        for (let i = 0; i < n; i++) {
            const s = tokens[ptr++];
            if (s.length % 2 === 1) {
                oddCount++;
            }
            for (let j = 0; j < s.length; j++) {
                if (s[j] === '0') totalZeros++;
                else totalOnes++;
            }
        }

        if (oddCount > 0) {
            out.push(n);
        } else {
            if (totalZeros % 2 === 0 && totalOnes % 2 === 0) {
                out.push(n);
            } else {
                out.push(n - 1);
            }
        }
    }

    console.log(out.join('\n'));
}

solve();
