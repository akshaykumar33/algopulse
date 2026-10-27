const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const x = parseInt(tokens[ptr++], 10);
    const t = parseInt(tokens[ptr++], 10);
    const a = parseInt(tokens[ptr++], 10);
    const b = parseInt(tokens[ptr++], 10);
    const da = parseInt(tokens[ptr++], 10);
    const db = parseInt(tokens[ptr++], 10);

    if (x === 0) {
        console.log("YES");
        return;
    }

    let possible = false;
    for (let i = 0; i < t; i++) {
        for (let j = 0; j < t; j++) {
            let val1 = a - i * da;
            let val2 = b - j * db;
            if (val1 === x || val2 === x || (val1 >= 0 && val2 >= 0 && val1 + val2 === x)) {
                possible = true;
                break;
            }
        }
        if (possible) break;
    }

    console.log(possible ? "YES" : "NO");
}

solve();
