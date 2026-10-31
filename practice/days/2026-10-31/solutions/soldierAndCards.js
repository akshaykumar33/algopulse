const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    
    const k1 = parseInt(tokens[ptr++], 10);
    const q1 = [];
    for (let i = 0; i < k1; i++) {
        q1.push(parseInt(tokens[ptr++], 10));
    }
    
    const k2 = parseInt(tokens[ptr++], 10);
    const q2 = [];
    for (let i = 0; i < k2; i++) {
        q2.push(parseInt(tokens[ptr++], 10));
    }
    
    let steps = 0;
    const maxSteps = 1000000;
    const seen = new Set();
    
    while (q1.length > 0 && q2.length > 0) {
        if (steps > maxSteps) {
            console.log('-1');
            return;
        }
        
        const stateStr = q1.join(',') + '|' + q2.join(',');
        if (seen.has(stateStr)) {
            console.log('-1');
            return;
        }
        seen.add(stateStr);
        
        const c1 = q1.shift();
        const c2 = q2.shift();
        
        if (c1 > c2) {
            q1.push(c2);
            q1.push(c1);
        } else {
            q2.push(c1);
            q2.push(c2);
        }
        steps++;
    }
    
    const winner = q1.length > 0 ? 1 : 2;
    console.log(steps + ' ' + winner);
}

solve();
