const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = [];
    for (let i = 0; i < n; i++) a.push(parseInt(tokens[ptr++], 10));
    let minMoves = -1n;
    for (let pos = 0; pos < n; pos++) {
        let moves = 0n;
        let prev = 0n;
        for (let i = pos - 1; i >= 0; i--) {
            const ai = BigInt(a[i]);
            const k = prev / ai + 1n;
            moves += k;
            prev = k * ai;
        }
        prev = 0n;
        for (let i = pos + 1; i < n; i++) {
            const ai = BigInt(a[i]);
            const k = prev / ai + 1n;
            moves += k;
            prev = k * ai;
        }
        if (minMoves === -1n || moves < minMoves) {
            minMoves = moves;
        }
    }
    console.log(minMoves.toString());
}
solve();
