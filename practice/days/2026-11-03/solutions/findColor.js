const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);

    if (x === 0 || y === 0) {
        console.log('black');
        return;
    }

    const r2 = x * x + y * y;
    const r = Math.sqrt(r2);
    const r_floor = Math.floor(r);

    if (Math.abs(r - r_floor) < 1e-9) {
        console.log('black');
        return;
    }

    const ring = r_floor;
    let isBlack = false;
    if (ring % 2 === 1) {
        if ((x > 0 && y > 0) || (x < 0 && y < 0)) {
            isBlack = true;
        } else {
            isBlack = false;
        }
    } else {
        if ((x > 0 && y > 0) || (x < 0 && y < 0)) {
            isBlack = false;
        } else {
            isBlack = true;
        }
    }

    if (isBlack) {
        console.log('black');
    } else {
        console.log('white');
    }
}

solve();
