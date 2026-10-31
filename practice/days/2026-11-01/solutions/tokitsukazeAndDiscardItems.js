const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = BigInt(tokens[ptr++]);
    const m = parseInt(tokens[ptr++], 10);
    const k = BigInt(tokens[ptr++]);

    const p = [];
    for (let i = 0; i < m; i++) {
        p.push(BigInt(tokens[ptr++]));
    }

    let ans = 0;
    let idx = 0;
    let removed = 0n;

    while (idx < m) {
        ans++;
        let cur = p[idx];
        let page = (cur - removed - 1n) / k;
        let start = page * k + 1n + removed;
        let end = (page + 1n) * k + removed;

        let cnt = 0;
        while (idx < m && p[idx] <= end) {
            cnt++;
            idx++;
        }
        removed += BigInt(cnt);
    }

    console.log(ans);
}

solve();
