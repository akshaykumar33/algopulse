const fs = require('fs');

function solve() {
    const s = fs.readFileSync(0, 'utf-8').trim();
    if (!s) return;
    let steps = 0;
    let carry = 0;
    let i = s.length - 1;
    while (i > 0) {
        let bit = parseInt(s[i]) + carry;
        if (bit === 1) {
            carry = 1;
            steps += 2;
        } else {
            steps += 1;
        }
        i--;
    }
    if (carry === 1) {
        steps += 1;
    }
    console.log(steps);
}

solve();
