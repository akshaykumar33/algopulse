const fs = require('fs');
function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let lineIdx = 0;
    if (lineIdx >= input.length || input[lineIdx] === '') return;
    const t = parseInt(input[lineIdx++], 10);
    const out = [];
    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[lineIdx++], 10);
        const arr = input[lineIdx++].split(' ').map(Number);
        let pos1 = -1;
        let posN = -1;
        for (let i = 0; i < n; i++) {
            if (arr[i] === 1) pos1 = i;
            if (arr[i] === n) posN = i;
        }
        let ans = pos1 + (n - 1 - posN);
        if (pos1 > posN) {
            ans--;
        }
        out.push(ans);
    }
    console.log(out.join('\n'));
}
solve();
