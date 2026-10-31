const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        let sum = 0;
        for (let j = 1; j <= n; j++) {
            let s = 0;
            let x = j;
            while (x > 0) {
                s += x % 10;
                x = Math.floor(x / 10);
            }
            sum += s;
        }
        out.push(sum);
    }
    console.log(out.join('\n'));
}

solve();
