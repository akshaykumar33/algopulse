const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        if (n % 2 !== 0) {
            out.push(-1);
        } else {
            let s = '';
            for (let j = 0; j < n / 2; j++) {
                s += '0';
            }
            for (let j = 0; j < n / 2; j++) {
                s += '1';
            }
            out.push(s);
        }
    }
    console.log(out.join('\n'));
}

solve();
