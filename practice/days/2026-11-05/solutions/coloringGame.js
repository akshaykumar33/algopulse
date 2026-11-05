const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = [];
        for (let i = 0; i < n; i++) {
            a.push(parseInt(tokens[ptr++], 10));
        }

        let ans = 0;
        for (let i = 0; i < n; i++) {
            let max_val = 0;
            for (let j = 0; j < n; j++) {
                if (i === j) continue;
                max_val = Math.max(max_val, a[j]);
            }
            
            let l = 0, r = n - 1;
            while (l <= r) {
                let mid = Math.floor((l + r) / 2);
                if (a[mid] <= max_val) {
                    ans = Math.max(ans, a[i] + a[mid]);
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
