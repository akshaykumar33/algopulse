const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length < 6 || tokens[0] === '') return;
    let ptr = 0;
    const x1 = BigInt(tokens[ptr++]);
    const y1 = BigInt(tokens[ptr++]);
    const x2 = BigInt(tokens[ptr++]);
    const y2 = BigInt(tokens[ptr++]);
    const x3 = BigInt(tokens[ptr++]);
    const y3 = BigInt(tokens[ptr++]);

    const cp = (x2 - x1) * (y3 - y2) - (y2 - y1) * (x3 - x2);

    if (cp > 0n) {
        console.log("LEFT");
    } else if (cp < 0n) {
        console.log("RIGHT");
    } else {
        console.log("TOWARDS");
    }
}

solve();
