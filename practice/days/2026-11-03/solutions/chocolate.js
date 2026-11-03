const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(parseInt(tokens[ptr++], 10));
    }
    const pos = [];
    for (let i = 0; i < n; i++) {
        if (arr[i] === 1) {
            pos.push(i);
        }
    }
    if (pos.length === 0) {
        console.log(0);
        return;
    }
    let ans = 1n;
    for (let i = 1; i < pos.length; i++) {
        const diff = BigInt(pos[i] - pos[i - 1]);
        ans *= diff;
    }
    console.log(ans.toString());
}
solve();
