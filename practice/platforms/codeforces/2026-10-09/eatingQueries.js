const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let ptr = 0;
    if (ptr >= input.length || input[ptr] === '') return;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const [n, q] = input[ptr++].split(/\s+/).map(Number);
        const arr = input[ptr++].split(/\s+/).map(Number);
        arr.sort((a, b) => b - a);
        const pref = new Array(n);
        pref[0] = arr[0];
        for (let i = 1; i < n; i++) {
            pref[i] = pref[i - 1] + arr[i];
        }

        for (let i = 0; i < q; i++) {
            const x = Number(input[ptr++]);
            if (pref[n - 1] < x) {
                out.push(-1);
                continue;
            }
            let l = 0, r = n - 1, res = -1;
            while (l <= r) {
                const mid = (l + r) >> 1;
                if (pref[mid] >= x) {
                    res = mid + 1;
                    r = mid - 1;
                } else {
                    l = mid + 1;
                }
            }
            out.push(res);
        }
    }
    console.log(out.join('\n'));
}

solve();
