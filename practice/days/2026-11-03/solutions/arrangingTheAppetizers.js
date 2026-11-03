const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const s = tokens[ptr++];
        const n = s.length;
        const m = 1 << n;
        const arr = new Array(m);
        for (let j = 0; j < m; j++) {
            let rev = 0;
            for (let k = 0; k < n; k++) {
                if ((j & (1 << k)) !== 0) {
                    rev |= (1 << (n - 1 - k));
                }
            }
            arr[rev] = s[j];
        }
        out.push(arr.join(''));
    }
    console.log(out.join('\n'));
}

solve();
