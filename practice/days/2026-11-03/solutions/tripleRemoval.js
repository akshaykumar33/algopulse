const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const q = parseInt(tokens[ptr++], 10);
        const a = new Array(n + 1);
        for (let i = 1; i <= n; i++) {
            a[i] = parseInt(tokens[ptr++], 10);
        }

        const pref0 = new Array(n + 1).fill(0);
        const pref1 = new Array(n + 1).fill(0);
        const pref2 = new Array(n + 1).fill(0);

        for (let i = 1; i <= n; i++) {
            pref0[i] = pref0[i - 1] + (a[i] === 0 ? 1 : 0);
            pref1[i] = pref1[i - 1] + (a[i] === 1 ? 1 : 0);
            pref2[i] = pref2[i - 1] + (a[i] === 2 ? 1 : 0);
        }

        for (let qi = 0; qi < q; qi++) {
            const l = parseInt(tokens[ptr++], 10);
            const r = parseInt(tokens[ptr++], 10);
            const c0 = pref0[r] - pref0[l - 1];
            const c1 = pref1[r] - pref1[l - 1];
            const c2 = pref2[r] - pref2[l - 1];

            if (c0 === 0 && c1 === 0 && c2 === 0) {
                out.push(0);
                continue;
            }
            
            const len = r - l + 1;
            if (len % 3 !== 0) {
                out.push(-1);
                continue;
            }

            let ans = 0;
            if (c0 >= len / 3 && c1 >= len / 3 && c2 >= len / 3) {
                let rem0 = c0 - len / 3;
                let rem1 = c1 - len / 3;
                let rem2 = c2 - len / 3;
                let min_rem = Math.min(rem0, Math.min(rem1, rem2));
                ans = (len / 3) - min_rem;
            } else {
                let max_c = Math.max(c0, Math.max(c1, c2));
                if (max_c > len / 3) {
                    ans = -1;
                } else {
                    ans = len / 3;
                }
            }
            out.push(ans);
        }
    }
    console.log(out.join('\n'));
}

solve();
