const fs = require('fs');
function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n+/);
    if (input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];
    for (let i = 0; i < t; i++) {
        const n = parseInt(input[ptr++], 10);
        const arr = input[ptr++].trim().split(/\s+/).map(Number);
        let minVal = arr[0];
        for (let j = 1; j < n; j++) {
            if (arr[j] < minVal) {
                minVal = arr[j];
            }
        }
        out.push(minVal);
    }
    console.log(out.join('\n'));
}
solve();
