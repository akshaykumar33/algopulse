const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const freq = new Int32Array(35);
        for (let i = 0; i < n; i++) {
            const x = parseInt(tokens[ptr++], 10);
            if (x > 0) {
                const msb = 31 - Math.clz32(x);
                freq[msb]++;
            }
        }
        let maxCount = 0;
        for (let i = 0; i < 35; i++) {
            if (freq[i] > maxCount) maxCount = freq[i];
        }
        out.push(maxCount);
    }
    console.log(out.join('\n'));
}

solve();
