const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const n = parseInt(lines[0], 10);
    const arr = lines[1].trim().split(/\s+/).map(Number);
    arr.sort((a, b) => a - b);
    let ans = 0;
    for (let i = 0; i < n / 2; i++) {
        const sum = arr[i] + arr[n - 1 - i];
        ans += sum * sum;
    }
    const out = [ans];
    console.log(out.join('\n'));
}

solve();
