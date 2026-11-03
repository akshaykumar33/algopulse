const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        let even = 0;
        let odd = 0;
        for (let i = 0; i < n; i++) {
            const v = parseInt(tokens[ptr++], 10);
            if (v % 2 === 0) even++;
            else odd++;
        }
        const oddSlots = Math.ceil(n / 2);
        const evenSlots = Math.floor(n / 2);
        const ans = Math.min(even, oddSlots) + Math.min(odd, evenSlots);
        out.push(ans);
    }
    console.log(out.join('\n'));
}
solve();
