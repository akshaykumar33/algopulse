const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const arr = [];
    let evens = 0;
    let odds = 0;
    let lastEven = -1;
    let lastOdd = -1;

    for (let i = 0; i < n; i++) {
        const val = parseInt(tokens[ptr++], 10);
        arr.push(val);
        if (val % 2 === 0) {
            evens++;
            lastEven = i + 1;
        } else {
            odds++;
            lastOdd = i + 1;
        }
    }

    const out = [];
    if (evens === 1) {
        out.push(lastEven);
    } else {
        out.push(lastOdd);
    }
    console.log(out.join('\n'));
}

solve();
