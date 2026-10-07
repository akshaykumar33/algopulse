const fs = require('fs');

const solve = () => {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        if (ptr >= input.length) break;
        const n = parseInt(input[ptr++], 10);
        const tri = [];
        for (let i = 0; i < n; i++) {
            tri.push(input[ptr++].trim().split(/\s+/).map(Number));
        }
        for (let i = n - 2; i >= 0; i--) {
            for (let j = 0; j <= i; j++) {
                tri[i][j] += Math.max(tri[i + 1][j], tri[i + 1][j + 1]);
            }
        }
        out.push(tri[0][0]);
    }
    console.log(out.join('\n'));
};

solve();
