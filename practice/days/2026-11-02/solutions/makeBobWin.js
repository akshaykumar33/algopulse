const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const s = tokens[ptr++];
        let zeros = 0;
        let ones = 0;
        for (let j = 0; j < n; j++) {
            if (s[j] === '0') zeros++;
            else ones++;
        }
        if (zeros === 0) {
            out.push(0);
        } else if (zeros % 2 === 1) {
            out.push(1);
        } else {
            out.push(2);
        }
    }
    console.log(out.join('\n'));
}
solve();
