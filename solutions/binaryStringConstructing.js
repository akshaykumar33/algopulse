const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (lines.length < 3 || lines[0] === '') return;
    let a = parseInt(lines[0], 10);
    let b = parseInt(lines[1], 10);
    const x = parseInt(lines[2], 10);

    const s = [];
    if (a > b) {
        let cur = 0;
        for (let i = 0; i <= x; i++) {
            s.push(cur);
            if (cur === 0) a--;
            else b--;
            cur ^= 1;
        }
        const res = [];
        for (let i = 0; i < s.length; i++) {
            res.push(s[i]);
            if (s[i] === 0 && a > 0) {
                res.push('0'.repeat(a));
                a = 0;
            } else if (s[i] === 1 && b > 0) {
                res.push('1'.repeat(b));
                b = 0;
            }
        }
        console.log(res.join(''));
    } else {
        let cur = 1;
        for (let i = 0; i <= x; i++) {
            s.push(cur);
            if (cur === 1) b--;
            else a--;
            cur ^= 1;
        }
        const res = [];
        for (let i = 0; i < s.length; i++) {
            res.push(s[i]);
            if (s[i] === 1 && b > 0) {
                res.push('1'.repeat(b));
                b = 0;
            } else if (s[i] === 0 && a > 0) {
                res.push('0'.repeat(a));
                a = 0;
            }
        }
        console.log(res.join(''));
    }
}

solve();
