const fs = require('fs');

function solve() {
    const buffer = fs.readFileSync(0);
    let offset = 0;

    function readInt() {
        while (offset < buffer.length && buffer[offset] <= 32) {
            offset++;
        }
        if (offset >= buffer.length) return null;
        let res = 0;
        let sign = 1;
        if (buffer[offset] === 45) {
            sign = -1;
            offset++;
        }
        while (offset < buffer.length && buffer[offset] >= 48 && buffer[offset] <= 57) {
            res = res * 10 + (buffer[offset] - 48);
            offset++;
        }
        return res * sign;
    }

    const t = readInt();
    if (t === null) return;
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = readInt();
        const a = [];
        for (let j = 0; j < n; j++) {
            a.push(readInt());
        }
        const b = [];
        for (let j = 0; j < n; j++) {
            b.push(readInt());
        }
        const pairs = [];
        for (let j = 0; j < n; j++) {
            pairs.push({a: a[j], b: b[j]});
        }
        pairs.sort((x, y) => x.a - y.a);
        let ans = 0;
        for (let j = 0; j < n; j++) {
            let cur = 0;
            for (let k = 0; k < n; k++) {
                if (pairs[k].b > pairs[j].b) {
                    cur++;
                }
            }
            if (cur > ans) {
                ans = cur;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
