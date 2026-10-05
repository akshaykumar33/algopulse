const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length < 2) return;
    const n = parseInt(input[0]);
    const b = input[1].split(' ').map(Number);
    const a = new Array(n);
    let maxVal = 0;
    for (let i = 0; i < n; i++) {
        a[i] = b[i] + maxVal;
        if (a[i] > maxVal) {
            maxVal = a[i];
        }
    }
    console.log(a.join(' '));
}

solve();
