const fs = require('fs');
function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let n = parseInt(tokens[0], 10);
    let k = parseInt(tokens[1], 10);
    let t = parseInt(tokens[2], 10);
    let total = n * k;
    let target = Math.floor(total * t / 100);
    let ans = new Array(n);
    for (let i = 0; i < n; i++) {
        if (target >= k) {
            ans[i] = k;
            target -= k;
        } else {
            ans[i] = target;
            target = 0;
        }
    }
    console.log(ans.join(' '));
}
solve();
