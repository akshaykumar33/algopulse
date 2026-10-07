const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let ptr = 0;
    const t = parseInt(input[ptr++], 10);
    const out = [];

    for (let tc = 0; tc < t; tc++) {
        const n = parseInt(input[ptr++], 10);
        const arr = input[ptr++].split(' ').map(Number);
        arr.sort((a, b) => a - b);
        const y = arr[0];
        let cnt = 0;
        for (let i = 1; i < n && cnt < Math.floor(n / 2); i++) {
            out.push(arr[i] + ' ' + y);
            cnt++;
        }
    }
    console.log(out.join('\n'));
}

solve();
