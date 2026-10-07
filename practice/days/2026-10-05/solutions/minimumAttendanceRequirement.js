const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let t = parseInt(lines[0]);
    let idx = 1;
    let out = [];
    
    for (let i = 0; i < t; i++) {
        let n = parseInt(lines[idx++]);
        let s = lines[idx++];
        
        let present = 0;
        for (let j = 0; j < n; j++) {
            if (s[j] === '1') {
                present++;
            }
        }
        
        let totalPossibleAfter = present + (120 - n);
        let req = 120 * 0.75;
        
        if (totalPossibleAfter >= req) {
            out.push("YES");
        } else {
            out.push("NO");
        }
    }
    
    console.log(out.join('\n'));
}

solve();
