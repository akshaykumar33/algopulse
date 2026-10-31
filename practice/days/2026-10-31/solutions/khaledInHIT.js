const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push(parseInt(tokens[ptr++], 10));
        }
        arr.sort((a, b) => a - b);

        const q = Math.floor(n / 4);
        const p1 = arr[q];
        const p2 = arr[2 * q];
        const p3 = arr[3 * q];

        let valid = true;
        if (arr[0] === p1 || arr[q] === p2 || arr[2 * q] === p3) {
            valid = false;
        } else {
            const c1 = new Set();
            const c2 = new Set();
            const c3 = new Set();
            const c4 = new Set();
            for (let i = 0; i < n; i++) {
                if (arr[i] < p1) c1.add(arr[i]);
                else if (arr[i] < p2) c2.add(arr[i]);
                else if (arr[i] < p3) c3.add(arr[i]);
                else c4.add(arr[i]);
            }
            if (c1.size !== q || c2.size !== q || c3.size !== q || c4.size !== q) {
                valid = false;
            }
        }

        if (valid) {
            out.push(p1 + " " + p2 + " " + p3);
        } else {
            out.push("-1");
        }
    }
    console.log(out.join('\n'));
}

solve();
