const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(input[0]);
    const out = [];
    for (let i = 1; i <= t; i++) {
        let n = BigInt(input[i]);
        if (n < 6n) {
            n = 6n;
        }
        if (n % 2n !== 0n) {
            n += 1n;
        }
        const ans = (n * 5n) / 2n;
        out.push(ans.toString());
    }
    console.log(out.join('\n'));
}

solve();
