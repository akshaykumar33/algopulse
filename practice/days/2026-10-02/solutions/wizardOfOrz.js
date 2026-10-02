const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0]);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[i]);
        if (n === 1) {
            out.push('9');
        } else if (n === 2) {
            out.push('98');
        } else {
            let res = '98';
            let cur = 9;
            for (let j = 2; j < n; j++) {
                res += cur;
                cur = (cur + 1) % 10;
            }
            out.push(res);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
