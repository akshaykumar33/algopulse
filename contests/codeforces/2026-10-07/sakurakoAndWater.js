const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const minDiag = new Map();
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const val = parseInt(input[ptr++], 10);
                const d = i - j;
                if (!minDiag.has(d) || val < minDiag.get(d)) {
                    minDiag.set(d, val);
                }
            }
        }
        let ans = 0;
        for (const [_, minVal] of minDiag) {
            if (minVal < 0) {
                ans += -minVal;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
