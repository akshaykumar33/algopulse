const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    let tc = parseInt(input[ptr++], 10);
    let out = [];
    while (tc-- > 0) {
        let n = parseInt(input[ptr++], 10);
        let p = new Int32Array(n);
        let low = 1, high = n;
        for (let i = n - 1; i >= 0; i--) {
            if (i % 2 === 1) {
                p[i] = high--;
            } else {
                p[i] = low++;
            }
        }
        out.push(p.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
