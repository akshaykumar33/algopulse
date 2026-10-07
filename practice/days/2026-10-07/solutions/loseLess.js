const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const m = parseInt(input[ptr++], 10);
        const n = parseInt(input[ptr++], 10);
        
        const wMin = Math.max(0, Math.ceil((n - m) / 2));
        const losses = m - n + 2 * wMin;
        out.push(losses);
    }
    console.log(out.join('\n'));
}

solve();
