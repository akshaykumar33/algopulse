const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const [n, r] = input[0].split(' ').map(Number);
    const out = [];
    for (let i = 1; i <= n; i++) {
        const R = Number(input[i]);
        if (R >= r) {
            out.push("GoodBad");
        } else {
            out.push("Bad");
        }
    }
    console.log(out.join('\n'));
}

solve();
