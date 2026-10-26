const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(lines[lineIdx++], 10);
        const pos = new Array(n * n + 1);
        for (let i = 0; i < n; i++) {
            const row = lines[lineIdx++].split(/\s+/).map(Number);
            for (let j = 0; j < n; j++) {
                pos[row[j]] = [i, j];
            }
        }

        let totalSteps = 0;
        let [r, c] = pos[1];
        for (let k = 2; k <= n * n; k++) {
            const [nr, nc] = pos[k];
            totalSteps += Math.abs(nr - r) + Math.abs(nc - c);
            r = nr;
            c = nc;
        }
        out.push(totalSteps);
    }
    console.log(out.join('\n'));
}

solve();
