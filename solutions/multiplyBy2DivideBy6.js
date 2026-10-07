const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(input[0], 10);
    let out = [];
    for (let i = 1; i <= t; i++) {
        let n = parseInt(input[i], 10);
        let a = 0;
        let b = 0;
        while (n % 2 === 0) {
            n /= 2;
            a++;
        }
        while (n % 3 === 0) {
            n /= 3;
            b++;
        }
        if (n !== 1 || a > b) {
            out.push(-1);
        } else {
            out.push(2 * b - a);
        }
    }
    console.log(out.join('\n'));
}

solve();
