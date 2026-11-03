const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    let sum = 0;
    let minVal = Infinity;
    for (let i = 0; i < n; i++) {
        const v = parseInt(tokens[ptr++], 10);
        a.push(v);
        sum += v;
        if (v < minVal) minVal = v;
    }
    let bestDelta = 0;
    for (let i = 0; i < n; i++) {
        const val = a[i];
        for (let d = 1; d * d <= val; d++) {
            if (val % d === 0) {
                const delta1 = (val / d + minVal * d) - (val + minVal);
                if (delta1 < bestDelta) bestDelta = delta1;
                const d2 = val / d;
                const delta2 = (val / d2 + minVal * d2) - (val + minVal);
                if (delta2 < bestDelta) bestDelta = delta2;
            }
        }
    }
    console.log(sum + bestDelta);
}
solve();
