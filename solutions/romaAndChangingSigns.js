const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length < 2) return;
    const [n, k] = lines[0].split(/\s+/).map(Number);
    const arr = lines[1].split(/\s+/).map(Number);

    let rem = k;
    for (let i = 0; i < n && rem > 0; i++) {
        if (arr[i] < 0) {
            arr[i] = -arr[i];
            rem--;
        }
    }

    arr.sort((a, b) => a - b);

    if (rem > 0 && rem % 2 === 1) {
        arr[0] = -arr[0];
    }

    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += arr[i];
    }

    console.log(sum);
}

solve();
