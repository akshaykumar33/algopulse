const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const t = parseInt(tokens[ptr++], 10);
    const out = [];
    
    for (let i = 0; i < t; i++) {
        let a = parseInt(tokens[ptr++], 10);
        let b = parseInt(tokens[ptr++], 10);
        let c = parseInt(tokens[ptr++], 10);
        
        let maxVal = a * 100 + b;
        
        let curA = a;
        let curB = b;
        
        while (true) {
            if (curB < c) {
                break;
            }
            let div = Math.floor(curB / c);
            let rem = curB % c;
            curA += div;
            curB = rem;
            
            let curTotal = curA * 100 + curB;
            if (curTotal > maxVal) {
                maxVal = curTotal;
            } else {
                break;
            }
        }
        out.push(maxVal);
    }
    console.log(out.join('\n'));
}

solve();
