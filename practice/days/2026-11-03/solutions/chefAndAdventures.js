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
        const x = parseInt(tokens[ptr++], 10);
        const y = parseInt(tokens[ptr++], 10);

        const c1 = (n >= 1 && m >= 1 && (n - 1) % x === 0 && (m - 1) % y === 0);
        const c2 = (n >= 2 && m >= 2 && (n - 2) % x === 0 && (m - 2) % y === 0);

        if (c1 || c2) {
            out.push('Chefirnemo');
        } else {
            out.push('Pofik');
        }
    }

    console.log(out.join('\n'));
}

solve();
