const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = Number(tokens[ptr++]);
        const rK = Number(tokens[ptr++]);
        const cK = Number(tokens[ptr++]);
        const rD = Number(tokens[ptr++]);
        const cD = Number(tokens[ptr++]);

        let ans = 0;
        if (rK < rD) ans = Math.max(ans, rD);
        if (rK > rD) ans = Math.max(ans, n - rD);
        if (cK < cD) ans = Math.max(ans, cD);
        if (cK > cD) ans = Math.max(ans, n - cD);

        out.push(ans);
    }

    console.log(out.join('\n'));
}

solve();
