const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (input.length < 2 || input[0] === '') return;
    let a = parseInt(input[0], 10);
    const b = parseInt(input[1], 10);
    let ans = 0;
    let leftovers = 0;
    while (a > 0) {
        ans += a;
        leftovers += a;
        a = Math.floor(leftovers / b);
        leftovers %= b;
    }
    console.log(ans);
}

solve();
