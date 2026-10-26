const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 2 || lines[0] === '') return;
    const n = parseInt(lines[0], 10);
    const m = parseInt(lines[1], 10);
    let ptr = 2;

    const grid = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < m; j++) {
            row.push(parseInt(lines[ptr++], 10));
        }
        grid.push(row);
    }

    const pow2 = [1n];
    for (let i = 1; i <= 60; i++) {
        pow2.push(pow2[i - 1] * 2n);
    }

    let ans = 0n;
    for (let i = 0; i < n; i++) {
        let c0 = 0, c1 = 0;
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 0) c0++;
            else c1++;
        }
        ans += (pow2[c0] - 1n) + (pow2[c1] - 1n);
    }

    for (let j = 0; j < m; j++) {
        let c0 = 0, c1 = 0;
        for (let i = 0; i < n; i++) {
            if (grid[i][j] === 0) c0++;
            else c1++;
        }
        ans += (pow2[c0] - 1n) + (pow2[c1] - 1n);
    }

    ans -= BigInt(n * m);
    console.log(ans.toString());
}

solve();
