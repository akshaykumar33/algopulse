const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    const t = parseInt(input[0], 10);
    let ptr = 1;
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(input[ptr++], 10);
        const k = parseInt(input[ptr++], 10);
        
        let mult = Math.ceil(n / k);
        let actualK = k * mult;
        let ans = Math.ceil(actualK / n);
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
