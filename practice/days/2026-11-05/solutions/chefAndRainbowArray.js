const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = new Array(n);
        for (let j = 0; j < n; j++) {
            arr[j] = parseInt(tokens[ptr++], 10);
        }

        let ok = true;
        for (let j = 0; j < Math.floor(n / 2); j++) {
            if (arr[j] !== arr[n - 1 - j]) {
                ok = false;
                break;
            }
        }

        if (ok) {
            let expected = 1;
            let has7 = false;
            for (let j = 0; j <= Math.floor(n / 2); j++) {
                let val = arr[j];
                if (val === 7) has7 = true;
                if (val !== expected && val !== expected + 1) {
                    ok = false;
                    break;
                }
                if (val === expected + 1) {
                    expected++;
                }
            }
            if (!has7 || expected !== 7) {
                ok = false;
            }
        }

        if (ok) {
            out.push('yes');
        } else {
            out.push('no');
        }
    }

    console.log(out.join('\n'));
}

solve();
