const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    let t = parseInt(lines[0], 10);
    let idx = 1;
    let out = [];
    while (t--) {
        let n = parseInt(lines[idx++], 10);
        let arr = lines[idx++].split(/\s+/).map(Number);
        let maxVal = 0;
        let sumSec = 0;
        for (let i = 0; i < n; i++) {
            if (arr[i] > maxVal) {
                maxVal = arr[i];
            }
            sumSec += Math.ceil(arr[i] / 2);
        }
        let ans = Math.min(maxVal, sumSec);
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
