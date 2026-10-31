const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const a = parseInt(tokens[ptr++], 10);
        const c = parseInt(tokens[ptr++], 10);
        if ((a + c) % 2 !== 0) {
            out.push(-1);
        } else {
            out.push((a + c) / 2);
        }
    }
    console.log(out.join('\n'));
}

solve();
