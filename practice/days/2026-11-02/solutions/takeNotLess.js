const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;

    const out = [];
    const t = parseInt(tokens[ptr++], 10);

    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        const arr = new Array(n);
        for (let j = 0; j < n; j++) {
            arr[j] = parseInt(tokens[ptr++], 10);
        }

        arr.sort((a, b) => a - b);

        let possible = true;
        if (n % 2 !== 0) {
            possible = false;
        } else {
            for (let j = 0; j < n; j += 2) {
                if (arr[j] !== arr[j + 1]) {
                    possible = false;
                    break;
                }
            }
        }

        out.push(possible ? "YES" : "NO");
    }
    console.log(out.join('\n'));
}

solve();
