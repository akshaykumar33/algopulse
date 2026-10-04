const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const s = lines[i];
        let a = 0;
        let b = 0;
        for (let j = 0; j < s.length; j++) {
            if (s[j] === 'a') {
                a++;
            } else if (s[j] === 'b') {
                b++;
            }
        }
        out.push(Math.min(a, b));
    }
    
    console.log(out.join('\n'));
}

solve();
