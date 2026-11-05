const fs = require('fs');

function solve() {
    const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
    if (!tokens || tokens.length === 0 || tokens[0] === '') return;
    let ptr = 0;
    
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    
    const A = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < m; j++) {
            row.push(parseInt(tokens[ptr++], 10));
        }
        A.push(row);
    }
    
    const q = parseInt(tokens[ptr++], 10);
    
    let maxVal = -1;
    let possible = false;
    
    for (let i = 0; i < q; i++) {
        const r = parseInt(tokens[ptr++], 10);
        const c = parseInt(tokens[ptr++], 10);
        const energy = parseInt(tokens[ptr++], 10);
        
        if (r <= n && c <= m) {
            possible = true;
            const val = A[r - 1][c - 1] * energy;
            if (val > maxVal) {
                maxVal = val;
            }
        }
    }
    
    if (possible) {
        console.log("YES " + maxVal);
    } else {
        console.log("NO 0");
    }
}

solve();
