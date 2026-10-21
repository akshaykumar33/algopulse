const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    let tc = parseInt(input[ptr++], 10);
    let out = [];
    while (tc-- > 0) {
        let n = parseInt(input[ptr++], 10);
        let a = new Int32Array(n);
        let totalOr = 0;
        for (let i = 0; i < n; i++) {
            let val = parseInt(input[ptr++], 10);
            a[i] = val;
            totalOr |= val;
        }
        let cnt = 0;
        let cur = 0;
        for (let i = 0; i < n; i++) {
            cur |= a[i];
            if (cur === totalOr) {
                cnt++;
                cur = 0;
            }
        }
        if (cnt === 0) cnt = 1;
        out.push(n - cnt);
    }
    console.log(out.join('\n'));
}

solve();
