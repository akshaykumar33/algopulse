const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    const t = parseInt(lines[0], 10);
    const out = [];
    
    for (let i = 1; i <= t; i++) {
        const s = lines[i];
        let first = -1;
        let last = -1;
        let cnt = 0;
        
        for (let j = 0; j < s.length; j++) {
            if (s[j] === '1') {
                if (first === -1) first = j;
                last = j;
                cnt++;
            }
        }
        
        if (cnt > 0 && last - first + 1 === cnt) {
            out.push('YES');
        } else {
            out.push('NO');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
