const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let t = parseInt(input[0], 10);
    let idx = 1;
    let out = [];
    while (t-- > 0 && idx < input.length) {
        let n = parseInt(input[idx++], 10);
        let arr = [];
        let l = 1;
        let r = n;
        for (let i = 0; i < n; i++) {
            if (i % 2 === 0) {
                arr.push(l++);
            } else {
                arr.push(r--);
            }
        }
        out.push(arr.join(' '));
    }
    console.log(out.join('\n'));
}

solve();
