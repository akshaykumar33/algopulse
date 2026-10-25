const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (lines.length === 0 || lines[0] === '') return;
    
    const t = parseInt(lines[0]);
    const out = [];
    let lineIdx = 1;
    
    for (let i = 0; i < t; i++) {
        if (lineIdx >= lines.length) break;
        const s = lines[lineIdx++];
        const counts = {};
        for (let j = 0; j < s.length; j++) {
            const c = s[j];
            counts[c] = (counts[c] || 0) + 1;
        };
        let cost = 0;
        for (const k in counts) {
            const cnt = counts[k];
            cost += Math.floor(cnt / 2) + Math.floor((cnt % 2 + 1) / 2);
        }
        out.push(cost);
    }
    
    console.log(out.join('\n'));
}

solve();
