const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length < 2) return;
    const n = parseInt(input[0], 10);
    const arr = input[1].split(' ').map(Number);

    let totalOnes = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i] === 1) totalOnes++;
    }

    if (totalOnes === n) {
        console.log(n - 1);
        return;
    }

    let maxGain = -1;
    let curGain = 0;

    for (let i = 0; i < n; i++) {
        const val = (arr[i] === 0) ? 1 : -1;
        curGain += val;
        if (curGain > maxGain) {
            maxGain = curGain;
        }
        if (curGain < 0) {
            curGain = 0;
        }
    }

    console.log(totalOnes + maxGain);
}

solve();
