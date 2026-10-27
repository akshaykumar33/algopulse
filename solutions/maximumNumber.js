const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let n = parseInt(tokens[0], 10);
    let out = [];
    if (n % 2 === 1) {
        out.push('7');
        n -= 3;
    }
    while (n > 0) {
        out.push('1');
        n -= 2;
    }
    console.log(out.join(''));
}
solve();
