const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;

    const first = lines[0].trim().split(/\s+/);
    const n = parseInt(first[0], 10);
    const d = parseInt(first[1], 10);

    const x = lines[1].trim().split(/\s+/).map(Number);

    let ans = 0;
    let j = 0;

    for (let i = 0; i < n; i++) {
        while (j < n && x[j] - x[i] <= d) {
            j++;
        }
        const count = j - 1 - i;
        if (count >= 2) {
            ans += (count * (count - 1)) / 2;
        }
    }

    console.log(ans);
}

solve();
