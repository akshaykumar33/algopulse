const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const [a, b, c] = lines[i].split(' ').map(Number);
        const sum = a + b + c;
        if (sum > 0 && sum < 3) {
            out.push(1);
        } else {
            out.push(0);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
