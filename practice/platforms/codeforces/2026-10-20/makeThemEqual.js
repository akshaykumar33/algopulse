const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length < 2) return;
    const n = parseInt(input[0]);
    const arr = input[1].split(/\s+/).map(Number);
    const unique = Array.from(new Set(arr)).sort((a, b) => a - b);
    let ans = -1;
    if (unique.length === 1) {
        ans = 0;
    } else if (unique.length === 2) {
        let diff = unique[1] - unique[0];
        if (diff % 2 === 0) {
            ans = diff / 2;
        } else {
            ans = diff;
        }
    } else if (unique.length === 3) {
        if (unique[1] - unique[0] === unique[2] - unique[1]) {
            ans = unique[1] - unique[0];
        }
    }
    const out = [ans];
    console.log(out.join('\n'));
}

solve();
