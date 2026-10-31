const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (!input) return;
    let s = input;
    let steps = 0;
    while (s !== '1') {
        if (s[s.length - 1] === '0') {
            s = s.slice(0, -1);
        } else {
            let idx = s.length - 1;
            while (idx >= 0 && s[idx] === '1') {
                idx--;
            }
            if (idx < 0) {
                s = '1' + '0'.repeat(s.length);
            } else {
                s = s.slice(0, idx) + '1' + '0'.repeat(s.length - 1 - idx);
            }
        }
        steps++;
    }
    console.log(steps);
}

solve();
