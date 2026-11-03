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
        let blocks = [];
        for (let j = 0; j < n; j++) {
            if (j === 0 || s[j] !== s[j - 1]) {
                blocks.push(s[j]);
            }
        }
        let countA = 0;
        let countB = 0;
        for (let j = 0; j < blocks.length; j++) {
            if (blocks[j] === 'A') {
                countA++;
            } else {
                countB++;
            }
        }
        out.push(Math.min(countA, countB));
    }
    console.log(out.join('\n'));
}

solve();
