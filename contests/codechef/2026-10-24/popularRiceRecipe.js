const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    let lineIdx = 0;
    const t = parseInt(lines[lineIdx++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[lineIdx++], 10);
        const map = new Map();
        
        for (let j = 0; j < n; j++) {
            const parts = lines[lineIdx++].split(' ');
            const user = parts[0];
            const vote = parts[1];
            map.set(user, vote);
        }
        
        let ans = 0;
        for (const vote of map.values()) {
            if (vote === '+') {
                ans += 1;
            } else {
                ans -= 1;
            }
        }
        
        out.push(ans);
    }
    
    console.log(out.join('\n'));
}

solve();
