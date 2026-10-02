const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const [s_a, s_b, s_c] = lines[i].split(' ').map(Number);
        
        if (s_c < s_b && s_c < s_a) {
            out.push("Notice");
        } else if (s_b < s_a && s_b < s_c) {
            out.push("Chef");
        } else {
            out.push("Draw");
        }
    }
    
    console.log(out.join('\n'));
}

solve();
