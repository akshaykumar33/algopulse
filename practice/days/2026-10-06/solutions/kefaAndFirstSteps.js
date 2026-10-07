const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length < 2) return;
    const n = parseInt(input[0], 10);
    const arr = input[1].split(/\s+/).map(Number);
    
    let ans = 1;
    let cur = 1;
    for (let i = 1; i < n; i++) {
        if (arr[i] >= arr[i - 1]) {
            cur++;
        } else {
            cur = 1;
        }
        if (cur > ans) {
            ans = cur;
        }
    }
    const out = [ans];
    console.log(out.join('\n'));
}

solve();
