const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const s = tokens[ptr++];
        let countB = 0;
        let countW = 0;
        for (let j = 0; j < n; j++) {
            if (j === 0 || s[j] !== s[j - 1]) {
                if (s[j] === 'B') countB++;
                else countW++;
            }
        }
        out.push(Math.min(countB, countW));
    }

    console.log(out.join('\n'));
}

solve();
