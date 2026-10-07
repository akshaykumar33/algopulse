const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    let t = parseInt(input[0], 10);
    let ptr = 1;
    let out = [];
    while (t-- > 0) {
        let n = parseInt(input[ptr++], 10);
        let arr = input[ptr++].split(' ').map(Number);
        arr.sort((a, b) => a - b);
        let sum = 0;
        for (let i = 0; i < n; i++) {
            sum += arr[i];
        }
        let ans = sum;
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
