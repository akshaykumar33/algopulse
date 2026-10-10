const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = Number(input[ptr++]);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = Number(input[ptr++]);
        let minVal = Infinity;
        let maxVal = -Infinity;
        for (let i = 0; i < n; i++) {
            const x = Number(input[ptr++]);
            if (x < minVal) minVal = x;
            if (x > maxVal) maxVal = x;
        }
        if (maxVal - minVal <= n + 1) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    console.log(out.join('\n'));
}

solve();
