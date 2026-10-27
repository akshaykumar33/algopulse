const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8');
    const lines = input.trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const [n, m] = lines[0].trim().split(/\s+/).map(Number);
    const s = new Set();
    
    for (let i = 1; i <= n; i++) {
        const row = lines[i].trim();
        const g = row.indexOf('G');
        const cand = row.indexOf('S');
        if (g > cand) {
            console.log(-1);
            return;
        }
        s.add(cand - g);
    }
    console.log(s.size);
}

solve();
