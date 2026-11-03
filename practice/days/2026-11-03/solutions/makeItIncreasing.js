const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = new Float64Array(n);
    for (let i = 0; i < n; i++) {
        a[i] = Number(tokens[ptr++]);
    }

    let minMoves = Infinity;
    for (let pos = 0; pos < n; pos++) {
        let moves = 0;
        let prev = 0;
        for (let i = pos - 1; i >= 0; i--) {
            const k = Math.floor(prev / a[i]) + 1;
            moves += k;
            prev = k * a[i];
        }
        prev = 0;
        for (let i = pos + 1; i < n; i++) {
            const k = Math.floor(prev / a[i]) + 1;
            moves += k;
            prev = k * a[i];
        }
        if (moves < minMoves) {
            minMoves = moves;
        }
    }
    console.log(minMoves);
}

solve();
