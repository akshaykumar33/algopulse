const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    let pos = 0;

    function nextInt() {
        while (pos < input.length && input.charCodeAt(pos) <= 32) {
            pos++;
        }
        if (pos >= input.length) return null;
        let res = 0;
        while (pos < input.length && input.charCodeAt(pos) > 32) {
            res = res * 10 + (input.charCodeAt(pos) - 48);
            pos++;
        }
        return res;
    }

    const t = nextInt();
    if (t === null) return;
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = nextInt();
        const a = new Int32Array(n);
        const last = new Int32Array(n + 1);
        for (let i = 0; i < n; i++) {
            a[i] = nextInt();
            last[a[i]] = i;
        }

        let bad = -1;
        for (let i = n - 2; i >= 0; i--) {
            if (a[i] > a[i + 1]) {
                bad = i;
                break;
            }
        }

        if (bad === -1) {
            out.push(0);
            continue;
        }

        let maxLast = -1;
        for (let i = 0; i <= bad; i++) {
            if (last[a[i]] > maxLast) {
                maxLast = last[a[i]];
            }
        }

        let cur = bad;
        while (cur < maxLast) {
            cur++;
            if (last[a[cur]] > maxLast) {
                maxLast = last[a[cur]];
            }
        }

        const zeroed = new Uint8Array(n + 1);
        let distinct = 0;
        for (let i = 0; i <= maxLast; i++) {
            if (!zeroed[a[i]]) {
                zeroed[a[i]] = 1;
                distinct++;
            }
        }

        out.push(distinct);
    }

    console.log(out.join('\n'));
}

solve();
