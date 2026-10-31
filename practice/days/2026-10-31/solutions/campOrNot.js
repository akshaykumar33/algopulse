const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    
    const d = parseInt(tokens[ptr++], 10);
    const req = new Array(32).fill(0);
    for (let i = 0; i < d; i++) {
        const day = parseInt(tokens[ptr++], 10);
        const p = parseInt(tokens[ptr++], 10);
        req[day] = p;
    }
    
    for (let i = 1; i <= 31; i++) {
        req[i] += req[i - 1];
    }
    
    const q = parseInt(tokens[ptr++], 10);
    const out = [];
    for (let i = 0; i < q; i++) {
        const deadline = parseInt(tokens[ptr++], 10);
        const target = parseInt(tokens[ptr++], 10);
        
        let checkDay = deadline;
        if (checkDay > 31) checkDay = 31;
        
        if (req[checkDay] >= target) {
            out.push('Go Camp');
        } else {
            out.push('Going to Study');
        }
    }
    
    console.log(out.join('\n'));
}

solve();
