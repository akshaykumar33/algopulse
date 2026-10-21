const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        if (ptr >= input.length) break;
        const line = input[ptr++].trim();
        if (!line) continue;
        const n = parseInt(line, 10);
        const a = input[ptr++].trim().split(/\s+/).map(Number);

        let minCost = -1;
        let i = 0;
        while (i < n) {
            let j = i;
            while (j < n && a[j] === a[i]) {
                j++;
            }
            const len = j - i;
            const cost = (n - len) * a[i];
            if (minCost === -1 || cost < minCost) {
                minCost = cost;
            }
            i = j;
        }
        out.push(minCost);
    }

    console.log(out.join('\n'));
}

solve();
