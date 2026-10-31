const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const tokens = input.trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    let odd = 0;
    let even = 0;
    for (let i = 0; i < n; i++) {
        const x = parseInt(tokens[ptr++], 10);
        if (x % 2 === 0) {
            even++;
        } else {
            odd++;
        }
    }
    const ans = BigInt(odd) * BigInt(even);
    console.log(ans.toString());
}

solve();
