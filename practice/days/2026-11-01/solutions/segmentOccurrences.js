const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    let pos = 0;
    while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
    if (pos >= input.length) return;

    function nextToken() {
        while (pos < input.length && input.charCodeAt(pos) <= 32) pos++;
        if (pos >= input.length) return null;
        let start = pos;
        while (pos < input.length && input.charCodeAt(pos) > 32) pos++;
        return input.slice(start, pos);
    }

    const nStr = nextToken();
    if (!nStr) return;
    const n = parseInt(nStr, 10);
    const m = parseInt(nextToken(), 10);
    const q = parseInt(nextToken(), 10);
    const s = nextToken();
    const t = nextToken();

    const match = new Array(n).fill(0);
    for (let i = 0; i <= n - m; i++) {
        let ok = true;
        for (let j = 0; j < m; j++) {
            if (s[i + j] !== t[j]) {
                ok = false;
                break;
            }
        }
        if (ok) {
            match[i] = 1;
        }
    }

    const pref = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + match[i];
    }

    const out = [];
    for (let i = 0; i < q; i++) {
        const l = parseInt(nextToken(), 10) - 1;
        const r = parseInt(nextToken(), 10);
        const rightLimit = r - m + 1;
        if (rightLimit < l || l > n - m || rightLimit < 0) {
            out.push(0);
        } else {
            const L = l;
            const R = Math.min(rightLimit, n);
            if (L > R) {
                out.push(0);
            } else {
                out.push(pref[R] - pref[L]);
            }
        }
    }
    console.log(out.join('\n'));
}

solve();
