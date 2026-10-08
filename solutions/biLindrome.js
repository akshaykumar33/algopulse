const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (input.length === 0 || input[0] === '') return;
    let t = parseInt(input[0], 10);
    let lineIdx = 1;
    let out = [];
    while (t-- > 0) {
        if (lineIdx >= input.length) break;
        let n = parseInt(input[lineIdx++], 10);
        let s = input[lineIdx++];
        let palindrome = true;
        let l = 0, r = n - 1;
        while (l < r) {
            if (s[l] !== s[r]) {
                palindrome = false;
                break;
            }
            l++;
            r--;
        }
        if (!palindrome) {
            out.push(n);
        } else {
            let same = true;
            for (let i = 1; i < n; i++) {
                if (s[i] !== s[0]) {
                    same = false;
                    break;
                }
            }
            if (same) {
                out.push(-1);
            } else {
                out.push(n - 1);
            }
        }
    }
    console.log(out.join('\n'));
}

solve();
