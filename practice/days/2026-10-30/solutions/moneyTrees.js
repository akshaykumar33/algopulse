const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const k = parseInt(tokens[ptr++], 10);

        const a = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            a[i] = parseInt(tokens[ptr++], 10);
        }

        const h = new Int32Array(n);
        for (let i = 0; i < n; i++) {
            h[i] = parseInt(tokens[ptr++], 10);
        }

        let ans = 0;
        let curSum = 0;
        let l = 0;

        for (let r = 0; r < n; r++) {
            if (r > 0 && h[r - 1] % h[r] !== 0) {
                l = r;
                curSum = 0;
            }
            curSum += a[r];
            while (curSum > k) {
                curSum -= a[l];
                l++;
            }
            if (r - l + 1 > ans) {
                ans = r - l + 1;
            }
        }

        out.push(ans);
    }

    console.log(out.join('\n'));
}

solve();
