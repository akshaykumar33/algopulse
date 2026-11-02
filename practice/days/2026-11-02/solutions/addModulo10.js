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
                hasEnding5 = true;
            } else if (x % 10 !== 0) {
                hasNonEnding5 = true;
            }
            while (x % 10 !== 2 && x % 10 !== 0) {
                x += x % 10;
            }
            arr[i] = x;
        }

        if (hasEnding5 && hasNonEnding5) {
            out.push('No');
            continue;
        }

        if (hasEnding5) {
            let base = arr[0];
            let ok = true;
            for (let i = 1; i < n; i++) {
                if (arr[i] !== base) {
                    ok = false;
                    break;
                }
            }
            out.push(ok ? 'Yes' : 'No');
        } else {
            let ok = true;
            for (let i = 1; i < n; i++) {
                if (Math.abs(arr[i] - arr[0]) % 20 !== 0) {
                    ok = false;
                    break;
                }
            }
            out.push(ok ? 'Yes' : 'No');
        }
    }
    console.log(out.join('\n'));
}

solve();
