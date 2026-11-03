const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const s = tokens[ptr++];
        let minVal = Infinity;
        for (let j = 0; j < s.length; j++) {
            const cur = s.slice(0, j) + s.slice(j + 1);
            const val = parseInt(cur, 10);
            if (val < minVal) {
                minVal = val;
            }
        }
        out.push(minVal);
    }
    console.log(out.join('\n'));
}

solve();
