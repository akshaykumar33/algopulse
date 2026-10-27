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
        while (offset < buffer.length && buffer[offset] > 32) {
            res = res * 10 + (buffer[offset] - 48);
            offset++;
        }
        return res;
    }

    function readString() {
        while (offset < buffer.length && buffer[offset] <= 32) {
            offset++;
        }
        if (offset >= buffer.length) return null;
        let start = offset;
        while (offset < buffer.length && buffer[offset] > 32) {
            offset++;
        }
        return buffer.toString('utf8', start, offset);
    }

    const t = readInt();
    if (t === null) return;
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = readInt();
        const s = readString();

        let totalA = 0;
        let totalB = 0;
        for (let i = 0; i < n; i++) {
            if (s[i] === 'a') totalA++;
            else totalB++;
        }

        if (totalA === totalB) {
            out.push(0);
            continue;
        }

        const D = totalA - totalB;
        let ans = Infinity;
        let curDiff = 0;
        const lastPos = new Map();
        lastPos.set(0, 0);

        for (let i = 1; i <= n; i++) {
            if (s[i - 1] === 'a') curDiff++;
            else curDiff--;

            const needed = curDiff - D;
            if (lastPos.has(needed)) {
                const len = i - lastPos.get(needed);
                if (len < n) {
                    ans = Math.min(ans, len);
                }
            }
            lastPos.set(curDiff, i);
        }

        out.push(ans === Infinity ? -1 : ans);
    }

    console.log(out.join('\n'));
}

solve();
