const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const s = tokens[1];
    const perms = ['RGB', 'RBG', 'GRB', 'GBR', 'BRG', 'BGR'];
    let minCost = Infinity;
    let bestPerm = '';
    for (const p of perms) {
        let cost = 0;
        for (let i = 0; i < n; i++) {
            if (s[i] !== p[i % 3]) cost++;
        }
        if (cost < minCost) {
            minCost = cost;
            bestPerm = p;
        }
    }
    const res = [];
    for (let i = 0; i < n; i++) {
        res.push(bestPerm[i % 3]);
    }
    console.log(minCost);
    console.log(res.join(''));
}
solve();
