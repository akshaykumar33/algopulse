const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const grid = [];
    for (let i = 0; i < n; i++) {
        grid.push(tokens[ptr++]);
    }
    let minR = n, maxR = -1, minC = m, maxC = -1, cnt = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 'B') {
                cnt++;
                if (i < minR) minR = i;
                if (i > maxR) maxR = i;
                if (j < minC) minC = j;
                if (j > maxC) maxC = j;
            }
        }
    }
    if (cnt === 0) {
        console.log(1);
        return;
    }
    const h = maxR - minR + 1;
    const w = maxC - minC + 1;
    const side = Math.max(h, w);
    if (side > n || side > m) {
        console.log(-1);
        return;
    }
    const ans = side * side - cnt;
    console.log(ans);
}
solve();
