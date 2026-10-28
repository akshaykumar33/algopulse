const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const s = new Set();
        for (let j = 0; j < n; j++) {
            const val = parseInt(tokens[ptr++], 10);
            if (val % 2 === 0) {
                s.add(val);
            }
        }

        const arr = Array.from(s);
        arr.sort((a, b) => b - a);

        const seen = new Set();
        let ans = 0;

        for (let j = 0; j < arr.length; j++) {
            let x = arr[j];
            while (x % 2 === 0 && !seen.has(x)) {
                seen.add(x);
                x /= 2;
                ans++;
            }
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
