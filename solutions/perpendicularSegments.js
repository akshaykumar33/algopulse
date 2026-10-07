const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0]);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const [x, y, k] = lines[i].split(' ').map(Number);
        const len = Math.min(x, y);
        out.push(`0 ${len} ${len} 0`);
        out.push(`0 0 ${len} ${len}`);
    }
    
    console.log(out.join('\n'));
}

solve();
