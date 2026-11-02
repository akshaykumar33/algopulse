const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const a = [];
        for (let j = 0; j < n; j++) {
            a.push(parseInt(tokens[ptr++], 10));
        }
        a.sort((x, y) => x - y);
        
        let low = 0;
        let high = 2e9;
        let ans = high;
        
        const check = (m) => {
            let cur = -1;
            for (let j = 0; j < n; j++) {
                if (a[j] <= cur) {
                    cur = Math.max(cur, a[j]);
                } else {
                    let target = a[j] - m;
                    if (target > cur + 1) {
                        cur = target;
                    } else {
                        cur = cur + 1;
                    }
                }
            }
            return true;
        };
        
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (mid >= 0) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
