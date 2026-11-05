const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(tokens[ptr++], 10);
        const m = parseInt(tokens[ptr++], 10);
        const grid = [];
        for (let i = 0; i < n; i++) {
            grid.push(tokens[ptr++]);
        }

        let cost1 = 0;
        let cost2 = 0;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                const expected1 = ((i + j) % 2 === 0) ? 'R' : 'G';
                const expected2 = ((i + j) % 2 === 0) ? 'G' : 'R';

                if (grid[i][j] !== expected1) {
                    if (grid[i][j] === 'R') {
                        cost1 += 5;
                    } else {
                        cost1 += 3;
                    }
                }

                if (grid[i][j] !== expected2) {
                    if (grid[i][j] === 'R') {
                        cost2 += 5;
                    } else {
                        cost2 += 3;
                    }
                }
            }
        }

        out.push(Math.min(cost1, cost2));
    }

    console.log(out.join('\n'));
}

solve();
