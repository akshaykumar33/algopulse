const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const map = new Map();
        for (let j = 0; j < n; j++) {
            const s = tokens[ptr++];
            const b = parseInt(tokens[ptr++], 10);
            if (!map.has(s)) {
                map.set(s, [0, 0]);
            }
            const counts = map.get(s);
            counts[b]++;
        }
        let ans = 0;
        for (const [s, counts] of map) {
            ans += Math.max(counts[0], counts[1]);
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}
solve();
