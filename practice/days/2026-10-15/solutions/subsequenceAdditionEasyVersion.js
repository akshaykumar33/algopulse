const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];

    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[lineIdx++], 10);
        const arr = lines[lineIdx++].split(' ').map(Number);
        arr.sort((a, b) => a - b);

        if (arr[0] !== 1) {
            out.push('NO');
            continue;
        }

        let sum = 1;
        let possible = true;

        for (let j = 1; j < n; j++) {
            if (arr[j] > sum) {
                possible = false;
                break;
            }
            sum += arr[j];
        }

        out.push(possible ? 'YES' : 'NO');
    }

    console.log(out.join('\n'));
}

solve();
