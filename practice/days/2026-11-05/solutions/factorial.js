const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let n = parseInt(tokens[0], 10);
    let ans = 1;
    for (let i = 2; i <= n; i++) {
        ans *= i;
    }
    console.log(ans);
}
solve();
