const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    let tc = parseInt(input[ptr++], 10);
    const MOD = 1000000007n;
    let out = [];
    while (tc-- > 0) {
        let n = BigInt(input[ptr++]);
        let ans = (((((n % MOD) * ((n + 1n) % MOD)) % MOD) * ((4n * n - 1n) % MOD)) % MOD * 337n) % MOD;
        out.push(ans.toString());
    }
    console.log(out.join('\n'));
}

solve();
