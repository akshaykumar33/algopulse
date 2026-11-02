const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const w = parseInt(tokens[0], 10);
    const h = parseInt(tokens[1], 10);

    let ans = 0n;
    for (let dx = 2; dx <= w; dx += 2) {
        for (let dy = 2; dy <= h; dy += 2) {
            const cntX = BigInt(w - dx + 1);
            const cntY = BigInt(h - dy + 1);
            ans += cntX * cntY;
        }
    }
    console.log(ans.toString());
}

solve();
