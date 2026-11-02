const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!input || input.length === 0 || input[0] === '') return;
    let ptr = 0;
    const n = parseInt(input[ptr++], 10);
    const s = input[ptr++];
    let ans = 0;
    for (let i = n; i < s.length; i += n) {
        if (s[i - 1] === s[i - 2] && s[i - 2] === s[i - 3]) {
            ans++;
        }
    }
    console.log(ans);
}

solve();
