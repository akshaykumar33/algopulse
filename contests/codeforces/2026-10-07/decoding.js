const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length < 2) return;
    const n = parseInt(input[0], 10);
    const s = input[1];
    const res = new Array(n);
    let l = 0;
    let r = n - 1;
    for (let i = n - 1; i >= 0; i--) {
        if (n % 2 === 1) {
            if (i % 2 === 1) {
                res[l++] = s[i];
            } else {
                res[r--] = s[i];
            }
        } else {
            if (i % 2 === 0) {
                res[l++] = s[i];
            } else {
                res[r--] = s[i];
            }
        }
    }
    console.log(res.join(''));
}

solve();
