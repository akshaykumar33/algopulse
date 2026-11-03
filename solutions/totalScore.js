const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const k = parseInt(tokens[ptr++], 10);
        const scores = new Float64Array(k);
        for (let j = 0; j < k; j++) {
            scores[j] = Number(tokens[ptr++]);
        }

        for (let i = 0; i < n; i++) {
            const s = tokens[ptr++];
            let total = 0;
            for (let j = 0; j < k; j++) {
                if (s.charCodeAt(j) === 49) {
                    total += scores[j];
                }
            }
            out.push(total);
        }
    }

    console.log(out.join('\n'));
}

solve();
