const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const [a, b] = lines[i].split(' ').map(Number);
        const minVal = Math.max(a, b);
        const maxVal = a + b;
        out.push(minVal + ' ' + maxVal);
    }
    
    console.log(out.join('\n'));
}

solve();
