const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        let max_sum = 0;
        let first = parseInt(tokens[ptr++], 10);
        let prev = first;
        for (let j = 1; j < n; j++) {
            const curr = parseInt(tokens[ptr++], 10);
            max_sum = Math.max(max_sum, prev + curr);
            prev = curr;
        }
        max_sum = Math.max(max_sum, prev + first);
        out.push(max_sum);
    }
    console.log(out.join('\n'));
}

solve();
