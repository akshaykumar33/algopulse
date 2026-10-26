const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const t = parseInt(lines[0], 10);
    const out = [];
    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[i], 10);
        const arr = new Array(n);
        for (let j = 0; j < n; j++) {
            arr[j] = j + 1;
        }
        for (let j = 0; j < n - 1; j += 2) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
        if (n % 2 !== 0) {
            const temp = arr[n - 1];
            arr[n - 1] = arr[n - 2];
            arr[n - 2] = temp;
        }
        out.push(arr.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
