const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const tokens = input.trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    let evens = 0;
    let odds = 0;
    let lastEven = -1;
    let lastOdd = -1;

    for (let i = 0; i < n; i++) {
        const val = parseInt(tokens[ptr++], 10);
        if (val % 2 === 0) {
            evens++;
            lastEven = i + 1;
        } else {
            odds++;
            lastOdd = i + 1;
        }
    }

    if (evens === 1) {
        console.log(lastEven);
    } else {
        console.log(lastOdd);
    }
}

solve();
