const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    const s = lines[0];
    let len = s.length;
    let ans = 0;
    for (let i = 1; i < len; i++) {
        ans += (1 << i);
    }
    let val = 0;
    for (let i = 0; i < len; i++) {
        val *= 2;
        if (s[i] === '7') {
            val += 1;
        }
    }
    ans += val + 1;
    console.log(ans);
}

solve();
