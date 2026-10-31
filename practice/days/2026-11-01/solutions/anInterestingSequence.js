const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        let k = parseInt(tokens[ptr++], 10);
        let ans = 0;
        while (k % 2 === 0) {
            k /= 2;
            ans++;
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
