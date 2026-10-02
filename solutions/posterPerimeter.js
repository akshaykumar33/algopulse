const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let lineIdx = 0;
    const t = parseInt(input[lineIdx++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const parts = input[lineIdx++].split(/\s+/).map(Number);
        const n = parts[0];
        const m = parts[1];
        const k = parts[2];
        let minDist = Infinity;
        for (let l = 1; l <= n; l++) {
            for (let w = 1; w <= m; w++) {
                const perim = 2 * (l + w);
                const diff = Math.abs(perim - k);
                if (diff < minDist) {
                    minDist = diff;
                }
            }
        }
        out.push(minDist);
    }
    console.log(out.join('\n'));
}

solve();
