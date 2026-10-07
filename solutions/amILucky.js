const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    let t = parseInt(input[0], 10);
    let idx = 1;
    let out = [];
    for (let i = 0; i < t; i++) {
        let parts = input[idx++].trim().split(/\s+/);
        let n = parseInt(parts[0], 10);
        let m = parseInt(parts[1], 10);
        let k = parseInt(parts[2], 10);
        let ans = Math.abs(n - m) % k;
        out.push(ans);
    }
    console.log(out.join('\n'));
}

solve();
