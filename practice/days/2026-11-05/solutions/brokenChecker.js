const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    const n = parseInt(tokens[0], 10);
    const ans = [2, 3, 2, 3, 1];
    console.log(ans[(n - 1) % 5]);
}
solve();
