const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    let idx = 1;
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[idx++], 10);
        const s = lines[idx++];
        
        let zeros = 0;
        for (let j = 0; j < n; j++) {
            if (s[j] === '0') zeros++;
        }
        
        if (zeros % 2 === 1 && zeros > 1) {
            out.push("ALICE");
        } else {
            out.push("BOB");
        }
    }
    
    console.log(out.join('\n'));
}

solve();
