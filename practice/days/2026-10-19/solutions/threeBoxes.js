const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0]);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const [a, b, c, d] = lines[i].split(' ').map(Number);
        const sum = a + b + c;
        if (sum <= d) {
            out.push(1);
        } else if (a + b <= d || a + c <= d || b + c <= d) {
            out.push(2);
        } else {
            out.push(3);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
