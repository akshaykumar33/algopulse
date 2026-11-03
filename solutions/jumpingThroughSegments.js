const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const l = new Int32Array(n);
        const r = new Int32Array(n);
        let maxR = 0;
        for (let i = 0; i < n; i++) {
            l[i] = parseInt(tokens[ptr++], 10);
            r[i] = parseInt(tokens[ptr++], 10);
            if (r[i] > maxR) maxR = r[i];
        }
        let low = 0;
        let high = maxR;
        let ans = maxR;
        while (low <= high) {
            const mid = (low + high) >> 1;
            let curL = 0;
            let curR = 0;
            let ok = true;
            for (let i = 0; i < n; i++) {
                curL -= mid;
                curR += mid;
                if (curL < l[i]) curL = l[i];
                if (curR > r[i]) curR = r[i];
                if (curL > curR) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
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
