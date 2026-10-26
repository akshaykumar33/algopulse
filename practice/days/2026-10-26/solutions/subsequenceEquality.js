const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const s = lines[i];
        const seen = new Set();
        let possible = false;
        for (let j = 0; j < s.length; j++) {
            if (seen.has(s[j])) {
                possible = true;
                break;
            }
            seen.add(s[j]);
        }
        if (possible) {
            out.push('yes');
        } else {
            out.push('no');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
