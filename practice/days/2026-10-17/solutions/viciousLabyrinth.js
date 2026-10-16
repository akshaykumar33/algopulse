const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    const t = parseInt(input[0], 10);
    let lineIdx = 1;
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        if (lineIdx >= input.length) break;
        const parts = input[lineIdx++].trim().split(/\s+/);
        const n = parseInt(parts[0], 10);
        const k = parseInt(parts[1], 10);

        const ans = new Array(n);
        if (n === 2) {
            ans[0] = 2;
            ans[1] = 1;
        } else if (k % 2 === 1) {
            for (let i = 0; i < n - 1; i++) {
                ans[i] = n;
            }
            ans[n - 1] = n - 1;
        } else {
            for (let i = 0; i < n - 2; i++) {
                ans[i] = n - 1;
            }
            ans[n - 2] = n;
            ans[n - 1] = n - 1;
        }
        out.push(ans.join(' '));
    }

    console.log(out.join('\n'));
}

solve();
