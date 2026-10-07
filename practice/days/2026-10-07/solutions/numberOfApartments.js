const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        let found = false;
        for (let x = 0; x * 3 <= n; x++) {
            for (let y = 0; x * 3 + y * 5 <= n; y++) {
                const rem = n - x * 3 - y * 5;
                if (rem % 7 === 0) {
                    const z = rem / 7;
                    out.push(`${x} ${y} ${z}`);
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        if (!found) {
            out.push('-1');
        }
    }
    console.log(out.join('\n'));
}

solve();
