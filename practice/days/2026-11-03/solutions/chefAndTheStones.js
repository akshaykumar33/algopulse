const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        let n1 = BigInt(tokens[ptr++]);
        let n2 = BigInt(tokens[ptr++]);
        let m = BigInt(tokens[ptr++]);
        let maxRem = m * (m + 1n) / 2n;
        let total = n1 + n2;
        let limit = maxRem;
        if (n1 > n2) {
            let temp = n1;
            n1 = n2;
            n2 = temp;
        }
        if (n1 < limit) {
            limit = n1;
        }
        out.push((total - 2n * limit).toString());
    }
    console.log(out.join('\n'));
}

solve();
