const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const [r, g, b, w] = lines[i].split(' ').map(Number);
        
        const isValid = (x, y, z, wval) => {
            let odds = 0;
            if (x % 2 !== 0) odds++;
            if (y % 2 !== 0) odds++;
            if (z % 2 !== 0) odds++;
            if (wval % 2 !== 0) odds++;
            return odds <= 1;
        };
        
        let possible = false;
        if (isValid(r, g, b, w)) {
            possible = true;
        } else if (r > 0 && g > 0 && b > 0) {
            if (isValid(r - 1, g - 1, b - 1, w + 3)) {
                possible = true;
            }
        }
        
        if (possible) {
            out.push("Yes");
        } else {
            out.push("No");
        }
    }
    
    console.log(out.join('\n'));
}

solve();
