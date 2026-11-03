const fs = require('fs');

function solve() {
    const buf = fs.readFileSync(0);
    let pos = 0;

    function nextInt() {
        while (pos < buf.length && buf[pos] <= 32) pos++;
        if (pos >= buf.length) return null;
        let res = 0;
        while (pos < buf.length && buf[pos] > 32) {
            res = res * 10 + (buf[pos] - 48);
            pos++;
        }
        return res;
    }

    const t = nextInt();
    if (t === null) return;
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = nextInt();
        const rowHasZero = new Uint8Array(n);
        const colHasZero = new Uint8Array(n);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const val = nextInt();
                if (val === 0) {
                    rowHasZero[i] = 1;
                    colHasZero[j] = 1;
                }
            }
        }

        let ok = true;
        for (let i = 0; i < n; i++) {
            if (!rowHasZero[i]) {
                ok = false;
                break;
            }
        }
        if (ok) {
            for (let j = 0; j < n; j++) {
                if (!colHasZero[j]) {
                    ok = false;
                    break;
                }
            }
        }

        out.push(ok ? 'YES' : 'NO');
    }

    console.log(out.join('\n'));
}

solve();
