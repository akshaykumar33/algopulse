const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    const a = tokens[ptr++];
    const b = tokens[ptr++];
    let cost = 0;
    let i = 0;
    while (i < n) {
        if (a[i] === b[i]) {
            i++;
        } else {
            if (i + 1 < n && a[i + 1] !== b[i + 1] && a[i] !== a[i + 1]) {
                cost += 1;
                i += 2;
            } else {
                cost += 1;
                i += 1;
            }
        }
    }
    console.log(cost);
}
solve();
