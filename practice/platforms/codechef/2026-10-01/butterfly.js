const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        if (i >= lines.length) break;
        const [r, g, b] = lines[i].trim().split(/\s+/).map(Number);
        
        if (r + g >= b && g + b >= r && b + r >= g) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    
    console.log(out.join('\n'));
}

solve();
