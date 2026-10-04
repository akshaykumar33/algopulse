const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const [a, b, n] = lines[i].split(' ').map(Number);
        const rem = n % 3;
        if (rem === 0) {
            out.push(a);
        } else if (rem === 1) {
            out.push(b);
        } else {
            out.push(a ^ b);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
