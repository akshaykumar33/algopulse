const fs = require('fs');

function solve() {
    const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/);
    if (!lines || lines.length === 0 || lines[0] === '') return;
    
    let ptr = 0;
    const t = parseInt(lines[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(lines[ptr++], 10);
        const chef = lines[ptr++];
        const codechef = lines[ptr++];
        
        let chefWins = 0;
        let codechefWins = 0;
        
        for (let j = 0; j < n; j++) {
            const c = chef[j];
            const cc = codechef[j];
            
            if (c === cc) continue;
            
            if ((c === 'R' && cc === 'S') || (c === 'P' && cc === 'R') || (c === 'S' && cc === 'P')) {
                chefWins++;
            } else {
                codechefWins++;
            }
        }
        
        if (chefWins > codechefWins) {
            out.push(0);
        } else {
            const diff = codechefWins - chefWins;
            out.push(Math.floor(diff / 2) + 1);
        }
    }
    
    console.log(out.join('\n'));
}

solve();
