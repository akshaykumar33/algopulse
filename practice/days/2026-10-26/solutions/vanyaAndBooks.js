const fs = require('fs');
function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (!input) return;
    const n = BigInt(input);
    let ans = 0n;
    let len = 1n;
    let start = 1n;
    while (start <= n) {
        let end = start * 10n - 1n;
        if (end > n) {
            end = n;
        }
        ans += (end - start + 1n) * len;
        len += 1n;
        start *= 10n;
    }
    console.log(ans.toString());
}
solve();
