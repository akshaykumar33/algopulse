const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);

    const r2 = x * x + y * y;
    const rInt = Math.round(Math.sqrt(r2));
    if (rInt * rInt === r2 || x === 0 || y === 0) {
        console.log('black');
        return;
    }

    const r = Math.floor(Math.sqrt(r2));
    const prod = x * y;
    let isBlack;
    if (r % 2 === 0) {
        isBlack = prod > 0;
    } else {
        isBlack = prod < 0;
    }

    console.log(isBlack ? 'black' : 'white');
}

solve();
