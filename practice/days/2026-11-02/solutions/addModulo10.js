const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = new Array(n);
        let hasEnding5 = false;
        let hasNonEnding5 = false;

        for (let i = 0; i < n; i++) {
            let x = parseInt(tokens[ptr++], 10);
            if (x % 10 === 5) {
                x += 5;
            }
            while (x % 10 !== 2 && x % 10 !== 0) {
                x += x % 10;
            }
            arr[i] = x;
        }

        let ok = true;
        for (let i = 0; i < n; i++) {
            if (arr[i] % 10 === 0) {
                if (arr[i] !== arr[0]) {
                    ok = false;
                }
            } else {
                if (Math.abs(arr[i] - arr[0]) % 20 !== 0) {
                    ok = false;
                }
            }
        }

        out.push(ok ? 'Yes' : 'No');
    }
    console.log(out.join('\n'));
}

solve();
