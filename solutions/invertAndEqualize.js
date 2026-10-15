const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    let t = parseInt(input[0]);
    let lineIdx = 1;
    let out = [];
    while (t--) {
        let n = parseInt(input[lineIdx++]);
        let s = input[lineIdx++];
        let cnt0 = 0;
        let cnt1 = 0;
        for (let i = 0; i < n; i++) {
            if (i === 0 || s[i] !== s[i - 1]) {
                if (s[i] === '0') cnt0++;
                else cnt1++;
            }
        }
        out.push(Math.min(cnt0, cnt1));
    }
    console.log(out.join('\n'));
}

solve();
