const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    const n = parseInt(tokens[ptr++], 10);
    
    let prevR = 0;
    let prevW = 0;
    let possible = true;
    
    for (let i = 0; i < n; i++) {
        const curR = parseInt(tokens[ptr++], 10);
        const curW = parseInt(tokens[ptr++], 10);
        
        const dr = curR - prevR;
        const dw = curW - prevW;
        
        if (dr < 0 || dw < 0 || dr < dw || dw > 6 || dr > 6) {
            possible = false;
        }
        
        prevR = curR;
        prevW = curW;
    }
    
    if (possible) {
        console.log("YES");
    } else {
        console.log("NO");
    }
}

solve();
