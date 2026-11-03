const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const k = parseInt(tokens[ptr++], 10);
        const s = tokens[ptr++];
        const n = 1 << k;
        const arr = new Array(n);

        for (let j = 0; j < n; j++) {
            let rev = 0;
            for (let b = 0; b < k; b++) {
                rev = (rev << 1) | ((j >> b) & 1);
            }
            arr[rev] = s[j];
        }

        out.push(arr.join(''));
    }

    console.log(out.join('\n'));
}

solve();
