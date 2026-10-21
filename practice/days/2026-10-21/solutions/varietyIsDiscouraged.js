const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    let ptr = 0;
    let t = parseInt(input[ptr++], 10);
    let out = [];
    while (t-- > 0) {
        let n = parseInt(input[ptr++], 10);
        let a = new Int32Array(n);
        let freq = new Map();
        for (let i = 0; i < n; i++) {
            let val = parseInt(input[ptr++], 10);
            a[i] = val;
            freq.set(val, (freq.get(val) || 0) + 1);
        }
        let maxLen = 0;
        let bestL = -1, bestR = -1;
        let curL = -1;
        for (let i = 0; i < n; i++) {
            if (freq.get(a[i]) === 1) {
                if (curL === -1) curL = i;
                let len = i - curL + 1;
                if (len > maxLen) {
                    maxLen = len;
                    bestL = curL;
                    bestR = i;
                }
            } else {
                curL = -1;
            }
        }
        if (maxLen === 0) {
            out.push('0');
        } else {
            out.push((bestL + 1) + ' ' + (bestR + 1));
        }
    }
    console.log(out.join('\n'));
}

solve();
