const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        const n = parseInt(tokens[ptr++], 10);
        
        let c1 = (360 % n === 0) ? 'y' : 'n';
        let c2 = (n <= 360) ? 'y' : 'n';
        let c3 = (n * (n + 1) / 2 <= 360) ? 'y' : 'n';
        
        out.push(c1 + ' ' + c2 + ' ' + c3);
    }
    
    console.log(out.join('\n'));
}

solve();
